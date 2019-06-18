import * as React from "react";
import { TrayWidget } from "./TrayWidget";
import { TrayBigItemWidget, TraySmallItemWidget } from "./TrayItemWidget";
import * as RJD from "storm-react-diagrams";
import domtoimage from 'dom-to-image';
import ClickOutside from '../../../common/ClickOutside'
import Modal from '../../../common/Modal/Modal'
import randomString from 'random-string';
// import the custom models
import { PageNodeModel } from "../custom/pages/PageNodeModel";
import { EventNodeModel } from "../custom/events/EventNodeModel";
import { TrafficNodeModel } from "../custom/traffic/TrafficNodeModel";
import { EmailMarketingNodeModel } from "../custom/emailMarketing/EmailMarketingNodeModel";

import PagesButton from '../../../../assets/PagesButton.svg'
import EventsButton from '../../../../assets/EventsButton.svg'
import TrafficButton from '../../../../assets/TrafficButton.svg'
import EmailMarketingButton from '../../../../assets/EmailMarketingButton.svg'
import TemplatesButton from '../../../../assets/TemplatesButton.svg'

import { ReactComponent as ArrowSelectSVG } from '../../../../assets/ArrowSelect.svg'

import { ReactComponent as LogoWidgetSVG } from '../../../../assets/logo-widget.svg'
import { ReactComponent as MenuWidgetSVG } from '../../../../assets/menu-widget.svg'
import ModalNodeWidget from '../../../common/ModalNodeWidget'
import { NavLink } from "react-router-dom";

import { API_URL } from '../../../../config'
import ReactSVG from 'react-svg';

const Select = ({ show, children, style }) => {
  const showHideClassName = show ? "select display-block" : "select display-none";
  return (
    <div className={showHideClassName}>
      <section className="select-main-body-widget up-arrow-body-widget" style={style}>
        {children}
      </section>
    </div>
  );
};

export default class BodyWidget extends React.Component {
  state = {
    serialization: null,
    deSerialization: null,
    show: false,
    showTemplateModal: false,
    toggle: 'first',
    backgroundActive: 'linear-gradient(90deg, #e62d24 0%, #fd8f21 100%)',
    backgroundDefault: '#212939',
    showSelect: false,
    showModal: false,
    saveBeforeExit: false,
  }

  handleChange = e => this.setState({
    [e.target.name]: e.target.value
  });

  showTemplateModal = () => this.setState({ showTemplateModal: true }, () => this.hideSelect());

  hideTemplateModal = () => this.setState({ showTemplateModal: false });

  saveDiagramHandle = file => this.setState({
    snackMsg: 'next',
    converted: this.props.app.serialization(this.props.app.getDiagramEngine().getDiagramModel())
  }, () => {
    this.props.work.saveDiagram(this.props.work.funnelId, this.state, file)
  });

  saveDiagramThenCreateTemplate = file => this.setState({
    snackMsg: 'next',
    converted: this.props.app.serialization(this.props.app.getDiagramEngine().getDiagramModel())
  }, () => {
    this.props.work.saveDiagramThenCreateTemplate(this.props.work.funnelId, this.state, file, this.state.templateName)
  });

  saveDiagramThenExit = file => this.setState({
    snackMsg: 'next',
    converted: this.props.app.serialization(this.props.app.getDiagramEngine().getDiagramModel())
  }, () => {
    this.props.work.saveDiagramThenExit(this.props.work.funnelId, this.state, file)
  });

  createTemplate = () => {
    this.props.work.createTemplate(this.props.work.funnelId, this.state.templateName)
  }

  saveTemplateHandle = () => this.setState({
    snackMsg: 'next',
    converted: this.props.app.serialization(this.props.app.getDiagramEngine().getDiagramModel())
  }, () => {
    this.props.work.saveTemplate(this.props.work.funnelId, this.state)
  });

  toggle = name => this.setState({
    toggle: name,
    show: true,
  });

  button = (name, icon, className) => {
    return (
      <div
        onClick={() => this.toggle(name)}
        className={className}
        style={{
          background: this.state.toggle === name ? this.state.backgroundActive : this.state.backgroundDefault,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'transparent',
            position: 'absolute'
          }}
          onClick={() => this.toggle(name)}
        ></div>

        <ReactSVG
          src={icon}
          alt=''
          beforeInjection={svg => {
            svg.setAttribute('style', `padding: 10;`)
          }}
        />
      </div>
    );
  }

  copyToClipboard = e => {
    this.link.select();
    document.execCommand('copy');
    e.target.focus();
    this.props.work.resetSendImageToCollaborateLink();
  };

  nodeFactory(data) {
    switch (data.type) {
      case "BlogPost": return new PageNodeModel("BlogPost");
      case "Calendar": return new PageNodeModel("Calendar");
      case "Download": return new PageNodeModel("Download");
      case "Generic": return new PageNodeModel("Generic");
      case "MembersArea": return new PageNodeModel("MembersArea");
      case "OptIn": return new PageNodeModel("OptIn");
      case "OrderPage": return new PageNodeModel("OrderPage");
      case "Popup": return new PageNodeModel("Popup");
      case "SalesPage": return new PageNodeModel("SalesPage");
      case "SalesVideo": return new PageNodeModel("SalesVideo");
      case "Survey": return new PageNodeModel("Survey");
      case "ThankYou": return new PageNodeModel("ThankYou");
      case "Upsell": return new PageNodeModel("Upsell");
      case "Webinar": return new PageNodeModel("Webinar");
      case "WebinarReplay": return new PageNodeModel("WebinarReplay");

      case "AddToCart": return new EventNodeModel('AddToCart');
      case "ClickButton": return new EventNodeModel('ClickButton');
      case "CompleteForm": return new EventNodeModel('CompleteForm');
      case "GenericEvent": return new EventNodeModel('GenericEvent');
      case "PopUpBox": return new EventNodeModel('PopUpBox');
      case "Purchase": return new EventNodeModel('Purchase');
      case "Scroll": return new EventNodeModel('Scroll');
      case "WatchVideo": return new EventNodeModel('WatchVideo');

      case "AddTag": return new EmailMarketingNodeModel('AddTag');
      case "Condition": return new EmailMarketingNodeModel('Condition');
      case "CustomAction": return new EmailMarketingNodeModel('CustomAction');
      case "RemoveTag": return new EmailMarketingNodeModel('RemoveTag');
      case "SendEmail": return new EmailMarketingNodeModel('SendEmail');
      case "SendNotification": return new EmailMarketingNodeModel('SendNotification');
      case "SendSms": return new EmailMarketingNodeModel('SendSms');
      case "Subscribe": return new EmailMarketingNodeModel('Subscribe');
      case "Unsubscribe": return new EmailMarketingNodeModel('Unsubscribe');
      case "Wait": return new EmailMarketingNodeModel('Wait');

      case "Adwords": return new TrafficNodeModel("Adwords");
      case "ChatBox": return new TrafficNodeModel("ChatBox");
      case "CustomSource": return new TrafficNodeModel("CustomSource");
      case "Email": return new TrafficNodeModel("Email");
      case "FacebookAds": return new TrafficNodeModel("FacebookAds");
      case "Facebook": return new TrafficNodeModel("Facebook");
      case "InstagramAds": return new TrafficNodeModel("InstagramAds");
      case "Instagram": return new TrafficNodeModel("Instagram");
      case "LinkedInAds": return new TrafficNodeModel("LinkedInAds");
      case "LinkedIn": return new TrafficNodeModel("LinkedIn");
      case "Messenger": return new TrafficNodeModel("Messenger");
      case "Search": return new TrafficNodeModel("Search");
      case "TrackingLink": return new TrafficNodeModel("TrackingLink");
      case "TwitterAds": return new TrafficNodeModel("TwitterAds");
      case "Twitter": return new TrafficNodeModel("Twitter");
      case "YoutubeAds": return new TrafficNodeModel("YoutubeAds");
      case "Youtube": return new TrafficNodeModel("Youtube");

      default: return new PageNodeModel("BlogPost");
    }
  }

  createBigItemsWidget(name) {
    if (this.props.work.svg) {
      let allItemsByName = this.props.app.getValues(this.props.work.svg, name)
      return allItemsByName.map((item, key) => (
        <TrayBigItemWidget key={key} model={{ type: item.name }} name={item.name} icon={API_URL + item.url} />
      ))
    }
  }

  createSmallItemsWidget(name) {
    if (this.props.work.svg) {
      let allItemsByName = this.props.app.getValues(this.props.work.svg, name)
      return allItemsByName.map((item, key) => (
        <TraySmallItemWidget key={key} model={{ type: item.name }} name={item.name} icon={API_URL + item.url} />
      ))
    }
  }

  showSelect = () => this.setState({ showSelect: true })
  hideSelect = () => this.setState({ showSelect: false })

  showMenu = () => this.setState({
    showMenu: true,
    funnelName: this.props.work.diagram && this.props.work.diagram.funnelName,
  })
  hideMenu = () => this.setState({ showMenu: false })

  showSaveBeforeExit = () => this.setState({ saveBeforeExit: true })
  hideSaveBeforeExit = () => this.setState({ saveBeforeExit: false })

  render() {
    return (
      <>
        <div className='message-diagram'>
          {this.props.work.message ?
            this.props.work.message
            : null}
        </div>
        <div className="body">
          <div className="header">
            <div
              className='logo-widget'
              onClick={this.showSaveBeforeExit}
            >
              <LogoWidgetSVG />
            </div>

            <div className="title">{this.props.work.diagram && this.props.work.diagram.funnelName}</div>

            {
              this.props.work.link ?
                <>
                  <input
                    className='created-link-wrapper'
                    style={{ margin: 0, padding: 10 }}
                    ref={ref => this.link = ref}
                    value={this.props.work.link}
                    onChange={() => { }}
                  />
                  <button
                    className='btn btn-1 btn-delete-modal'
                    style={{ margin: '0px 10px 0px 10px' }}
                    onClick={this.copyToClipboard}
                  >
                    Copy Link
                  </button>
                </>
                :
                null
            }

            {this.props.work.pathname.includes('diagram') ?
              <>
                <button
                  className="btn btn-1 diagram-header-button-save"
                  onClick={this.showSelect}
                >
                  SAVE
                  <div className='arrow-for-select'>
                    <ArrowSelectSVG />
                  </div>
                </button>

                <button
                  className="diagram-header-menu-button"
                  onClick={this.showMenu}
                  style={{ background: this.state.showMenu ? '#ecf1f2' : '#fff' }}
                >
                  <MenuWidgetSVG />
                </button>
              </>
              :
              <button
                className="btn btn-1 diagram-header-button-save"
                onClick={this.showSelect}
                style={{ margin: 8 }}
              >
                SAVE
                <div className='arrow-for-select'>
                  <ArrowSelectSVG />
                </div>
              </button>
            }

            <ModalNodeWidget
              show={this.state.showMenu}
              handleClose={this.hideMenu}
              style={{
                position: 'absolute',
                minHeight: '97%',
                top: 56,
              }}
            >
              <label className='label-create-widget-settings'>Funnel Options</label>
              <div style={{ padding: 15 }}>
                <label htmlFor="FunnelName" className='label-input'>
                  Funnel Name
                </label>
                <input
                  id="FunnelName"
                  placeholder="Funnel Name"
                  type="text"
                  value={this.state.funnelName}
                  onChange={this.handleChange}
                  name='funnelName'
                />
                {this.props.work.changeFunnelNameMessage && (
                  <div className={`input-group`}>{this.props.work.changeFunnelNameMessage}</div>
                )}
                <button
                  className='btn btn-1 create-project-button-in-modal'
                  style={{ display: 'block' }}
                  onClick={() => {
                    domtoimage.toBlob(this.diagramRef)
                      .then(data => {
                        let name = randomString({ length: 10 });
                        var file = new File([data], name, { type: "image/svg" });
                        this.saveDiagramHandle(file);
                        this.props.work.changeFunnelName(this.props.work.funnelId, this.state.funnelName)
                      })
                      .catch(function (error) {
                        console.error('oops, something went wrong!', error);
                      });

                  }}
                >
                  Save
                </button>
              </div>
            </ModalNodeWidget>

            {this.props.work.pathname.includes('diagram') ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ showSelect: false })
                }}
              >
                <Select show={this.state.showSelect}>
                  <button
                    className="btn btn-1 button-select-body-widget"
                    onClick={() => {
                      domtoimage.toPng(this.diagramRef)
                        .then(data => {
                          var img = new Image();
                          img.src = data;
                          var link = document.createElement('a');
                          link.download = 'my-diagram.png';
                          link.href = img.src;
                          link.click();
                          this.hideSelect()
                        })
                        .catch(function (error) {
                          console.error('oops, something went wrong!', error);
                        });

                    }}
                  >
                    Export PNG
                  </button>
                  <button
                    className="btn btn-1 button-select-body-widget"
                    onClick={() => {
                      domtoimage.toBlob(this.diagramRef)
                        .then(data => {
                          let name = randomString({ length: 10 });
                          var file = new File([data], name, { type: "image/svg" });
                          this.saveDiagramHandle(file);
                          this.hideSelect()
                        })
                        .catch(function (error) {
                          console.error('oops, something went wrong!', error);
                        });

                    }}
                  >
                    Update Diagram
                    </button>
                  <button
                    className="btn btn-1 button-select-body-widget"
                    onClick={() => {
                      domtoimage.toBlob(this.diagramRef)
                        .then(data => {
                          let name = randomString({ length: 10 });
                          var file = new File([data], name, { type: "image/svg" });
                          this.saveDiagramHandle(file);
                          this.props.work.sendImageToCollaborate(this.props.work.funnelId, file);
                          this.hideSelect()
                        })
                        .catch(function (error) {
                          console.error('oops, something went wrong!', error);
                        });

                    }}
                  >
                    Collaborate With Image
                    </button>
                  <button
                    className="btn btn-1 button-select-body-widget"
                    onClick={this.showTemplateModal}
                  >
                    Save As Template
                    </button>
                </Select>
              </ClickOutside>
              :
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ showSelect: false })
                }}
              >
                <Select show={this.state.showSelect} style={{ right: 5 }}>
                  <button
                    className="btn btn-1 button-select-body-widget"
                    onClick={() => {
                      domtoimage.toPng(this.diagramRef)
                        .then(data => {
                          var img = new Image();
                          img.src = data;
                          var link = document.createElement('a');
                          link.download = 'my-diagram.png';
                          link.href = img.src;
                          link.click();
                          this.hideSelect()
                        })
                        .catch(function (error) {
                          console.error('oops, something went wrong!', error);
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
            }
          </div>

          <div className="content">
            <Modal show={this.state.showTemplateModal} handleClose={this.hideTemplateModal}>
              <label className='label-create'>Create Template</label>

              <label htmlFor="Name" className='label-input'>
                Name
              </label>
              <input
                id="Name"
                placeholder="Template Name"
                type="text"
                value={this.state.templateName}
                onChange={this.handleChange}
                name='templateName'
              />
              {this.props.work.createTemplateMessage && (
                <div className={`input-group`}>{this.props.work.createTemplateMessage}</div>
              )}
              <button
                className='btn btn-1 create-project-button-in-modal'
                onClick={() => {
                  domtoimage.toBlob(this.diagramRef)
                    .then(data => {
                      let name = randomString({ length: 10 });
                      var file = new File([data], name, { type: "image/svg" });
                      this.saveDiagramThenCreateTemplate(file);
                    })
                    .catch(function (error) {
                      console.error('oops, something went wrong!', error);
                    });
                }}
              >
                Create Template
              </button>
            </Modal>

            <Modal show={this.state.saveBeforeExit} handleClose={this.hideSaveBeforeExit}>
              <label className='label-create'>Save Before Exit</label>

              <div style={{
                display: 'flex',
                width: 300,
                margin: '22px auto',
              }}>
                <button
                  className='btn btn-1 create-project-button-in-modal'
                  onClick={() => {
                    domtoimage.toBlob(this.diagramRef)
                      .then(data => {
                        let name = randomString({ length: 10 });
                        var file = new File([data], name, { type: "image/svg" });
                        this.saveDiagramThenExit(file)
                      })
                      .catch(function (error) {
                        console.error('oops, something went wrong!', error);
                      });
                  }}
                >
                  Save
                </button>
                <button className='btn btn-1 create-project-button-in-modal'>
                  <NavLink
                    to={'/'}
                    style={{
                      color: '#fff'
                    }}
                  >
                    Don't Save
                </NavLink>
                </button>
              </div>
              {this.props.work.message && (
                <div className='input-group'>{this.props.work.message}</div>
              )}
            </Modal>

            <div className='panel-buttons'>
              {this.button('first', PagesButton, 'panel-button panel-button-first')}
              {this.button('second', TrafficButton, 'panel-button')}
              {this.button('third', EventsButton, 'panel-button')}
              {this.button('fourth', EmailMarketingButton, 'panel-button')}
              {this.button('fifth', TemplatesButton, 'panel-button panel-button-last')}
            </div>

            {this.state.toggle === 'first' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  {this.createBigItemsWidget('Pages')}
                </TrayWidget>
              </ClickOutside> : null}

            {this.state.toggle === 'second' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  {this.createSmallItemsWidget('Traffic')}
                </TrayWidget>
              </ClickOutside> : null}

            {this.state.toggle === 'third' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  {this.createSmallItemsWidget('Events')}
                </TrayWidget>
              </ClickOutside> : null}

            {this.state.toggle === 'fourth' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  {this.createSmallItemsWidget('EmailMarketing')}
                </TrayWidget>
              </ClickOutside> : null}

            {this.state.toggle === 'fifth' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  {/* <TrayItemWidget model={{ type: "AddTag" }} name="AddTag" icon={AddTagSVG} /> */}
                </TrayWidget>
              </ClickOutside> : null}

            <div
              id="diagram-layer"
              ref={ref => this.diagramRef = ref}
              onDrop={event => {
                var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
                const node = this.nodeFactory(data);
                const points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
                node.x = points.x;
                node.y = points.y;
                this.props.app.getDiagramEngine().getDiagramModel().addNode(node);
                this.forceUpdate();
              }}

              onDragOver={event => {
                event.preventDefault();
              }}
            >
              <RJD.DiagramWidget
                deleteKeys={[46]}
                // smartRouting={true}
                allowCanvasZoom={false}
                allowCanvasTranslation={false}
                className="srd-demo-canvas"
                diagramEngine={this.props.app.getDiagramEngine()}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
