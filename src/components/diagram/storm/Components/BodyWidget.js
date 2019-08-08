import * as React from "react";
import { TrayWidget } from "./TrayWidget";
import { TrayBigItemWidget, TraySmallItemWidget } from "./TrayItemWidget";
import * as RJD from "storm-react-diagrams";
import domtoimage from "dom-to-image";
import ClickOutside from "../../../common/ClickOutside";
import Modal from "../../../common/Modal/Modal";
import randomString from "random-string";
import html2canvas from "html2canvas";
// import the custom models

import { CustomNodeModel } from "../custom/CustomNodeModel";

import PagesButton from "../../../../assets/PagesButton.svg";
import EventsButton from "../../../../assets/EventsButton.svg";
import TrafficButton from "../../../../assets/TrafficButton.svg";
import EmailMarketingButton from "../../../../assets/EmailMarketingButton.svg";
import TemplatesButton from "../../../../assets/TemplatesButton.svg";
import { ReactComponent as ArrowSelectSVG } from "../../../../assets/ArrowSelect.svg";
import { ReactComponent as LogoWidgetSVG } from "../../../../assets/logo-widget.svg";
import { ReactComponent as MenuWidgetSVG } from "../../../../assets/menu-widget.svg";
import { ReactComponent as ShareFunnelSVG } from "../../../../assets/instructions.svg";
import { ReactComponent as FunnelNotesSVG } from "../../../../assets/FunnelNotes.svg";
import LupaSVG from "../../../../assets/lupa.svg";
// import { ReactComponent as ChatSVG } from '../../../../assets/chat.svg'
import ModalNodeWidget from "../../../common/ModalNodeWidget";
import { NavLink } from "react-router-dom";
import { API_URL } from "../../../../config";
import ReactSVG from "react-svg";
import ModalFunnelWidget from "../../../common/ModalFunnelWidget";

import FunnelOptionsRightPanel from "./componentsForBodyWidget/FunnelOptionsRightPanel";
import FunnelNotesRightPanel from "./componentsForBodyWidget/FunnelNotesRightPanel";
import SettingsNodeRightPanel from "./componentsForBodyWidget/SettingsNodeRightPanel";
import NotesNodeRightPanel from "./componentsForBodyWidget/NotesNodeRightPanel";
import SaveBeforeExitModal from "./componentsForBodyWidget/SaveBeforeExitModal";
import CreateTemplateModal from "./componentsForBodyWidget/CreateTemplateModal";

const Select = ({ show, children, style }) => {
  const showHideClassName = show
    ? "select display-block"
    : "select display-none";
  return (
    <div className={showHideClassName}>
      <section
        className="select-main-body-widget up-arrow-body-widget"
        style={style}
      >
        {children}
      </section>
    </div>
  );
};

export default class BodyWidget extends React.Component {
  state = {
    show: false,
    toggle: "first",
    backgroundActive: "linear-gradient(90deg, #e62d24 0%, #fd8f21 100%)",
    backgroundDefault: "#212939",
    showSelect: false,
    inverseZoom: false,
    allowCanvasZoom: true
  };

  saveDiagramHandle = file =>
    this.setState(
      {
        snackMsg: "next",
        converted: this.props.app.serialization(
          this.props.app.getDiagramEngine().getDiagramModel()
        ),
        funnelNotes:
          (this.props.work.diagram && this.props.work.diagram.funnelNotes) || []
      },
      () => {
        this.props.work.saveDiagram(this.props.work.funnelId, this.state, file);
      }
    );

  saveDiagramThenCloseSettingModal = file =>
    this.setState(
      {
        snackMsg: "next",
        converted: this.props.app.serialization(
          this.props.work.showSettingsWidgetEngine
        )
      },
      () => {
        this.props.work.saveDiagramThenShowOrHideSettingsModal(
          this.props.work.funnelId,
          this.state,
          file,
          false
        );
      }
    );

  saveTemplateHandle = () =>
    this.setState(
      {
        snackMsg: "next",
        converted: this.props.app.serialization(
          this.props.app.getDiagramEngine().getDiagramModel()
        )
      },
      () => {
        this.props.work.saveTemplate(this.props.work.funnelId, this.state);
      }
    );

  toggle = name =>
    this.setState({
      toggle: name,
      show: true
    });

  button = (name, icon, className, title) => {
    return (
      <div
        onClick={() => this.toggle(name)}
        className={className}
        style={{
          background:
            this.state.toggle === name
              ? this.state.backgroundActive
              : this.state.backgroundDefault,
          justifyContent: "center",
          alignItems: "center",
          display: "flex"
        }}
        title={title}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "transparent",
            position: "absolute"
          }}
          onClick={() => this.toggle(name)}
        />

        <ReactSVG
          src={icon}
          alt=""
          beforeInjection={svg => {
            svg.setAttribute("style", `padding: 10;`);
          }}
        />
      </div>
    );
  };

  copyToClipboard = e => {
    this.link.select();
    document.execCommand("copy");
    e.target.focus();
    this.props.work.resetSendImageToCollaborateLink();
  };

  nodeFactory(data) {
    switch (data.type) {
      case data.type:
        return new CustomNodeModel(data.type);
      default:
        return new CustomNodeModel("BlogPost");
    }
  }

  createBigItemsWidget(name) {
    if (this.props.work.svg) {
      let allItemsByName = this.props.app.getValues(this.props.work.svg, name);
      return allItemsByName.map((item, key) => (
        <TrayBigItemWidget
          key={key}
          model={{ type: item.name }}
          name={item.name}
          icon={API_URL + item.url}
        />
      ));
    }
  }

  createSmallItemsWidget(name) {
    if (this.props.work.svg) {
      let allItemsByName = this.props.app.getValues(this.props.work.svg, name);
      return allItemsByName.map((item, key) => (
        <TraySmallItemWidget
          key={key}
          model={{ type: item.name }}
          name={item.name}
          icon={API_URL + item.url}
        />
      ));
    }
  }

  showSelect = () => this.setState({ showSelect: true });
  hideSelect = () => this.setState({ showSelect: false });

  scalePlus = () => {
    this.props.app.getDiagramEngine().getDiagramModel().zoom =
      this.props.app.getDiagramEngine().getDiagramModel().zoom + 5;
    document.getElementById("diagram-layer").click();
  };

  scaleMinus = () => {
    this.props.app.getDiagramEngine().getDiagramModel().zoom =
      this.props.app.getDiagramEngine().getDiagramModel().zoom - 5;
    document.getElementById("diagram-layer").click();
  };

  zoomToFit = () => {
    this.props.app.getDiagramEngine().zoomToFit();
    document.getElementById("diagram-layer").click();
  };

  render() {
    return (
      <>
        <SettingsNodeRightPanel work={this.props.work} app={this.props.app} />
        <NotesNodeRightPanel work={this.props.work} app={this.props.app} />

        <div className="message-diagram">
          {this.props.work.message ? this.props.work.message : null}
        </div>
        <div className="body">
          <div className="header">
            <SaveBeforeExitModal work={this.props.work} app={this.props.app} />

            <div className="title">
              {this.props.work.diagram && this.props.work.diagram.funnelName}
            </div>

            {this.props.work.link ? (
              <>
                <input
                  className="created-link-wrapper"
                  style={{ margin: 0, padding: 10 }}
                  ref={ref => (this.link = ref)}
                  value={this.props.work.link}
                  onChange={() => {}}
                />
                <button
                  className="btn btn-1 btn-delete-modal"
                  style={{ margin: "0px 10px 0px 10px" }}
                  onClick={this.copyToClipboard}
                >
                  Copy Link
                </button>
              </>
            ) : null}

            {this.props.work.pathname.includes("diagram") ? (
              <>
                <div className="zoom-wrapper">
                  <ReactSVG
                    src={LupaSVG}
                    alt=""
                    beforeInjection={svg => {
                      svg.setAttribute("style", "width: 17px; height: 25px;");
                    }}
                  />
                  <div className="zoom-count">
                    {this.props.app
                      .getDiagramEngine()
                      .getDiagramModel()
                      .zoom.toFixed(0)}
                    %
                  </div>
                  <div className="zoom-buttons-wrapper">
                    <button
                      className="zoom-button-plus"
                      onClick={this.scalePlus}
                    >
                      +
                    </button>
                    <button
                      className="zoom-button-minus"
                      onClick={this.scaleMinus}
                    >
                      -
                    </button>
                  </div>
                </div>

                <button
                  className="btn btn-1"
                  style={{
                    width: 100,
                    height: 40,
                    borderRadius: 7,
                    marginRight: 10
                  }}
                  onClick={() => this.zoomToFit()}
                >
                  Zoom to Fit
                </button>

                <button
                  className="btn btn-1 diagram-header-button-save"
                  onClick={this.showSelect}
                >
                  SAVE
                  <div className="arrow-for-select">
                    <ArrowSelectSVG />
                  </div>
                </button>

                <FunnelNotesRightPanel
                  work={this.props.work}
                  app={this.props.app}
                />

                <div className="diagram-header-instruction-buttons">
                  <button
                    className="diagram-header-instruction-button"
                    onClick={() => {
                      domtoimage
                        .toBlob(this.diagramRef)
                        .then(data => {
                          let name = randomString({ length: 10 });
                          var file = new File([data], name, {
                            type: "image/svg"
                          });
                          this.saveDiagramHandle(file);
                          this.props.work.sendImageToCollaborate(
                            this.props.work.funnelId,
                            file
                          );
                          this.hideSelect();
                        })
                        .catch(function(error) {
                          console.error("oops, something went wrong!", error);
                        });
                    }}
                    title={"Share The Funnel"}
                  >
                    <ShareFunnelSVG />
                  </button>
                </div>

                <FunnelOptionsRightPanel
                  work={this.props.work}
                  app={this.props.app}
                />
              </>
            ) : (
              <button
                className="btn btn-1 diagram-header-button-save"
                onClick={this.showSelect}
                style={{ margin: 12.5 }}
              >
                SAVE
                <div className="arrow-for-select">
                  <ArrowSelectSVG />
                </div>
              </button>
            )}

            {this.props.work.pathname.includes("diagram") ? (
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ showSelect: false });
                }}
              >
                <Select show={this.state.showSelect}>
                  <button
                    className="btn btn-1 button-select-body-widget"
                    onClick={() => {
                      domtoimage
                        .toPng(this.diagramRef)
                        .then(data => {
                          var img = new Image();
                          img.src = data;
                          var link = document.createElement("a");
                          link.download = "my-diagram.png";
                          link.href = img.src;
                          link.click();
                          this.hideSelect();
                        })
                        .catch(function(error) {
                          console.error("oops, something went wrong!", error);
                        });
                    }}
                  >
                    Export PNG
                  </button>
                  <button
                    className="btn btn-1 button-select-body-widget"
                    onClick={() => {
                      domtoimage
                        .toBlob(this.diagramRef)
                        .then(data => {
                          let name = randomString({ length: 10 });
                          var file = new File([data], name, {
                            type: "image/svg"
                          });
                          this.saveDiagramHandle(file);
                          this.hideSelect();
                        })
                        .catch(function(error) {
                          console.error("oops, something went wrong!", error);
                        });
                    }}
                  >
                    Update Funnel
                  </button>

                  <CreateTemplateModal
                    work={this.props.work}
                    app={this.props.app}
                  />
                </Select>
              </ClickOutside>
            ) : (
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ showSelect: false });
                }}
              >
                <Select show={this.state.showSelect} style={{ right: 9 }}>
                  <button
                    className="btn btn-1 button-select-body-widget"
                    onClick={() => {
                      domtoimage
                        .toPng(this.diagramRef)
                        .then(data => {
                          var img = new Image();
                          img.src = data;
                          var link = document.createElement("a");
                          link.download = "my-diagram.png";
                          link.href = img.src;
                          link.click();
                          this.hideSelect();
                        })
                        .catch(function(error) {
                          console.error("oops, something went wrong!", error);
                        });
                    }}
                  >
                    Export PNG
                  </button>
                  <button
                    className="btn btn-1 button-select-body-widget"
                    onClick={() => this.saveTemplateHandle()}
                  >
                    Update Template
                  </button>
                </Select>
              </ClickOutside>
            )}
          </div>

          <div className="content">
            <div className="panel-buttons">
              {this.button(
                "first",
                PagesButton,
                "panel-button panel-button-first",
                "Pages"
              )}
              {this.button("second", TrafficButton, "panel-button", "Traffic")}
              {this.button("third", EventsButton, "panel-button", "Events")}
              {this.button(
                "fourth",
                EmailMarketingButton,
                "panel-button",
                "Email Marketing"
              )}
              {this.button(
                "fifth",
                TemplatesButton,
                "panel-button panel-button-last",
                "Templates"
              )}
            </div>

            {this.state.toggle === "first" ? (
              <ClickOutside
                onClickOutside={() => this.setState({ show: false })}
              >
                <TrayWidget show={this.state.show}>
                  {this.createBigItemsWidget("Pages")}
                </TrayWidget>
              </ClickOutside>
            ) : null}

            {this.state.toggle === "second" ? (
              <ClickOutside
                onClickOutside={() => this.setState({ show: false })}
              >
                <TrayWidget show={this.state.show}>
                  {this.createSmallItemsWidget("Traffic")}
                </TrayWidget>
              </ClickOutside>
            ) : null}

            {this.state.toggle === "third" ? (
              <ClickOutside
                onClickOutside={() => this.setState({ show: false })}
              >
                <TrayWidget show={this.state.show}>
                  {this.createSmallItemsWidget("Events")}
                </TrayWidget>
              </ClickOutside>
            ) : null}

            {this.state.toggle === "fourth" ? (
              <ClickOutside
                onClickOutside={() => this.setState({ show: false })}
              >
                <TrayWidget show={this.state.show}>
                  {this.createSmallItemsWidget("EmailMarketing")}
                </TrayWidget>
              </ClickOutside>
            ) : null}

            {this.state.toggle === "fifth" ? (
              <ClickOutside
                onClickOutside={() => this.setState({ show: false })}
              >
                <TrayWidget show={this.state.show}>{/* empty */}</TrayWidget>
              </ClickOutside>
            ) : null}
            <div id="diagram">
              <div
                id="diagram-layer"
                ref={ref => (this.diagramRef = ref)}
                onDrop={event => {
                  var data = JSON.parse(
                    event.dataTransfer.getData("storm-diagram-node")
                  );
                  const node = this.nodeFactory(data);
                  const points = this.props.app
                    .getDiagramEngine()
                    .getRelativeMousePoint(event);
                  node.x = points.x;
                  node.y = points.y;
                  this.props.app
                    .getDiagramEngine()
                    .getDiagramModel()
                    .addNode(node);
                  this.forceUpdate();
                }}
                onDragOver={event => {
                  event.preventDefault();
                }}
                onWheel={event => {
                  var diagramModel = this.props.app
                    .getDiagramEngine()
                    .getDiagramModel();
                  event.preventDefault();
                  event.stopPropagation();
                  const oldZoomFactor = diagramModel.getZoomLevel() / 100;
                  let scrollDelta = this.state.inverseZoom
                    ? -event.deltaY
                    : event.deltaY;
                  if (event.ctrlKey && scrollDelta % 1 !== 0) {
                    scrollDelta /= 3;
                  } else {
                    scrollDelta /= 60;
                  }
                  if (diagramModel.getZoomLevel() + scrollDelta > 10) {
                    diagramModel.setZoomLevel(
                      diagramModel.getZoomLevel() + scrollDelta
                    );
                  }
                  const zoomFactor = diagramModel.getZoomLevel() / 100;
                  const boundingRect = event.currentTarget.getBoundingClientRect();
                  const clientWidth = boundingRect.width;
                  const clientHeight = boundingRect.height;
                  // compute difference between rect before and after scroll
                  const widthDiff =
                    clientWidth * zoomFactor - clientWidth * oldZoomFactor;
                  const heightDiff =
                    clientHeight * zoomFactor - clientHeight * oldZoomFactor;
                  // compute mouse coords relative to canvas
                  const clientX = event.clientX - boundingRect.left;
                  const clientY = event.clientY - boundingRect.top;
                  // compute width and height increment factor
                  const xFactor =
                    (clientX - diagramModel.getOffsetX()) /
                    oldZoomFactor /
                    clientWidth;
                  const yFactor =
                    (clientY - diagramModel.getOffsetY()) /
                    oldZoomFactor /
                    clientHeight;
                  diagramModel.setOffset(
                    diagramModel.getOffsetX() - widthDiff * xFactor,
                    diagramModel.getOffsetY() - heightDiff * yFactor
                  );
                  this.props.app.getDiagramEngine().enableRepaintEntities([]);
                  this.forceUpdate();
                }}
              >
                <RJD.DiagramWidget
                  deleteKeys={[46]}
                  // smartRouting={true}
                  allowCanvasZoom={false}
                  // allowCanvasTranslation={false}
                  className="srd-demo-canvas"
                  diagramEngine={this.props.app.getDiagramEngine()}
                  allowLooseLinks={false}
                  // maxNumberPointsPerLink={0}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
