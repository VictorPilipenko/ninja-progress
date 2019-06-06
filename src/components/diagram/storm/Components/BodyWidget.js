import * as React from "react";
import { TrayWidget } from "./TrayWidget";
import { TrayItemWidget } from "./TrayItemWidget";
import * as RJD from "storm-react-diagrams";
import domtoimage from 'dom-to-image';
import ClickOutside from '../../../common/ClickOutside'
import Modal from '../../../common/Modal/Modal'
import randomString from 'random-string';
// import the custom models
import { BlogPostNodeModel } from "../custom/pages/BlogPost/BlogPostNodeModel";
import { CalendarNodeModel } from "../custom/pages/Calendar/CalendarNodeModel";
import { DownloadNodeModel } from "../custom/pages/Download/DownloadNodeModel";
import { GenericNodeModel } from "../custom/pages/Generic/GenericNodeModel";
import { MembersAreaNodeModel } from "../custom/pages/MembersArea/MembersAreaNodeModel";
import { OptInNodeModel } from "../custom/pages/OptIn/OptInNodeModel";
import { OrderPageNodeModel } from "../custom/pages/OrderPage/OrderPageNodeModel";
import { PopupNodeModel } from "../custom/pages/Popup/PopupNodeModel";
import { SalesPageNodeModel } from "../custom/pages/SalesPage/SalesPageNodeModel";
import { SalesVideoNodeModel } from "../custom/pages/SalesVideo/SalesVideoNodeModel";
import { SurveyNodeModel } from "../custom/pages/Survey/SurveyNodeModel";
import { ThankYouNodeModel } from "../custom/pages/ThankYou/ThankYouNodeModel";
import { UpsellNodeModel } from "../custom/pages/Upsell/UpsellNodeModel";
import { WebinarNodeModel } from "../custom/pages/Webinar/WebinarNodeModel";
import { WebinarReplayNodeModel } from "../custom/pages/WebinarReplay/WebinarReplayNodeModel";

import { ReactComponent as BlogPostSVG } from '../../../../assets/pages/blog-post.svg'
import { ReactComponent as CalendarSVG } from '../../../../assets/pages/calendar.svg'
import { ReactComponent as DownloadSVG } from '../../../../assets/pages/download.svg'
import { ReactComponent as GenericSVG } from '../../../../assets/pages/generic.svg'
import { ReactComponent as MembersAreaSVG } from '../../../../assets/pages/members-area.svg'
import { ReactComponent as OptInSVG } from '../../../../assets/pages/opt-in.svg'
import { ReactComponent as OrderPageSVG } from '../../../../assets/pages/order-page.svg'
import { ReactComponent as PopupSVG } from '../../../../assets/pages/popup.svg'
import { ReactComponent as SalesPageSVG } from '../../../../assets/pages/sales-page.svg'
import { ReactComponent as SalesVideoSVG } from '../../../../assets/pages/sales-video.svg'
import { ReactComponent as SurveySVG } from '../../../../assets/pages/survey.svg'
import { ReactComponent as ThankYouSVG } from '../../../../assets/pages/thank-you.svg'
import { ReactComponent as UpsellSVG } from '../../../../assets/pages/upsell.svg'
import { ReactComponent as WebinarSVG } from '../../../../assets/pages/webinar.svg'
import { ReactComponent as WebinarReplaySVG } from '../../../../assets/pages/webinar-replay.svg'


export default class BodyWidget extends React.Component {
  state = {
    serialization: null,
    deSerialization: null,
    show: false,
    showTemplateModal: false,
    toggle: 'first',
    backgroundActive: 'linear-gradient(90deg, #e62d24 0%, #fd8f21 100%)',
    backgroundDefault: '#212939',
  }

  handleChange = e => this.setState({
    templateName: e.target.value
  });

  showTemplateModal = () => {
    this.setState({ showTemplateModal: true });
  };

  hideTemplateModal = () => {
    this.setState({ showTemplateModal: false });
  };


  saveDiagramHandle = () => {
    this.setState({
      snackMsg: 'next',
      converted: this.props.app.serialization(this.props.app.getDiagramEngine(), this.props.app.getDiagramEngine().getDiagramModel())
    },
      () => (
        this.props.work.saveDiagram(this.props.work.funnelId, this.state)
      )
    )
  }

  saveTemplateHandle = () => {
    this.saveDiagramHandle()
    this.props.work.saveTemplate(this.props.work.funnelId, this.state.templateName)
  }

  toggle = e => this.setState({
    toggle: e.target.name,
    show: true,
  });

  button = (name, text, className) => {
    return (
      <button
        name={name}
        onClick={e => this.toggle(e)}
        className={className}
        style={{ background: this.state.toggle === name ? this.state.backgroundActive : this.state.backgroundDefault }}
      >
        {text}
      </button>
    );
  }

  copyToClipboard = e => {
    this.link.select();
    document.execCommand('copy');
    e.target.focus();
    this.props.work.resetSendImageToCollaborateLink();
  };

  render() {

    return (
      <>
        <div className='message-diagram'>
          {this.props.work.message ? this.props.work.message : null}
        </div>
        <div className="body">
          <div className="header">
            {/* <div className="title">Storm React Diagrams</div> */}

            {
              this.props.work.link ?
                <>
                  <input
                    className='created-link-wrapper'
                    ref={ref => this.link = ref}
                    value={this.props.work.link}
                    onChange={() => { }}
                  />
                  <button className='btn btn-1 btn-delete-modal' style={{ margin: '15px auto' }} onClick={this.copyToClipboard}>Copy Link</button>
                </>
                :
                null
            }

            <div className='diagram-header-buttons-wrapper'>
              <button
                className="btn btn-1"
                onClick={() => {
                  domtoimage.toBlob(this.diagramRef)
                    .then(data => {
                      // var img = new Image();
                      // img.src = data;

                      let name = randomString({length: 10});
                      var file = new File([data], name);

                      // console.log(file)

                      // this.setState({
                      //   img: img.src
                      // }, () => console.log(this.state))

                      // console.log(name)

        

                      this.props.work.sendImageToCollaborate(this.props.work.funnelId, file)

                      // console.log(img.src)

                      // fetch(img.src)
                      //   .then(res => res.blob())
                      //   .then(blob => console.log(blob))

                      // var link = document.createElement('a');
                      // link.download = 'my-diagram.png';
                      // link.href = img.src;
                      // link.click();

                    })
                    .catch(function (error) {
                      console.error('oops, something went wrong!', error);
                    });
                }}>
                Export PNG
              </button>
              <button className="btn btn-1" onClick={() => this.saveDiagramHandle()}>Save Diagram</button>
              <button className="btn btn-1" onClick={this.showTemplateModal}>Save As Template</button>
            </div>

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
              />
              {/* {this.props.work.templateError && this.props.work.templateError.length > 0 && (
                <div className={`input-group`}>{this.props.work.templateError}</div>
              )} */}
              <button className='btn btn-1 create-project-button-in-modal' onClick={() => this.saveTemplateHandle()}>Create Template</button>
            </Modal>

            <div className='panel-buttons'>
              {this.button('first', 'pages', 'panel-button panel-button-first')}
              {this.button('second', '2', 'panel-button')}
              {this.button('third', '3', 'panel-button')}
              {this.button('fourth', '4', 'panel-button')}
              {this.button('fifth', '5', 'panel-button panel-button-last')}
            </div>

            {this.state.toggle === 'first' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  <TrayItemWidget model={{ type: "BlogPost" }} name="Blog post" icon={<BlogPostSVG />} />
                  <TrayItemWidget model={{ type: "Calendar" }} name="Calendar" icon={<CalendarSVG />} />
                  <TrayItemWidget model={{ type: "Download" }} name="Download" icon={<DownloadSVG />} />
                  <TrayItemWidget model={{ type: "Generic" }} name="Generic" icon={<GenericSVG />} />
                  <TrayItemWidget model={{ type: "MembersArea" }} name="Members area" icon={<MembersAreaSVG />} />
                  <TrayItemWidget model={{ type: "OptIn" }} name="Opt in" icon={<OptInSVG />} />
                  <TrayItemWidget model={{ type: "OrderPage" }} name="Order page" icon={<OrderPageSVG />} />
                  <TrayItemWidget model={{ type: "Popup" }} name="Popup" icon={<PopupSVG />} />
                  <TrayItemWidget model={{ type: "SalesPage" }} name="SalesPage" icon={<SalesPageSVG />} />
                  <TrayItemWidget model={{ type: "SalesVideo" }} name="SalesVideo" icon={<SalesVideoSVG />} />
                  <TrayItemWidget model={{ type: "Survey" }} name="Survey" icon={<SurveySVG />} />
                  <TrayItemWidget model={{ type: "ThankYou" }} name="ThankYou" icon={<ThankYouSVG />} />
                  <TrayItemWidget model={{ type: "Upsell" }} name="Upsell" icon={<UpsellSVG />} />
                  <TrayItemWidget model={{ type: "Webinar" }} name="Webinar" icon={<WebinarSVG />} />
                  <TrayItemWidget model={{ type: "WebinarReplay" }} name="WebinarReplay" icon={<WebinarReplaySVG />} />
                </TrayWidget>
              </ClickOutside> : null}

            {this.state.toggle === 'second' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  <TrayItemWidget model={{ type: "BlogPost" }} name="second" icon={<BlogPostSVG />} />
                  <TrayItemWidget model={{ type: "BlogPost" }} name="second" icon={<BlogPostSVG />} />
                </TrayWidget>
              </ClickOutside> : null}

            {this.state.toggle === 'third' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  <TrayItemWidget model={{ type: "BlogPost" }} name="third" icon={<BlogPostSVG />} />
                  <TrayItemWidget model={{ type: "BlogPost" }} name="third" icon={<BlogPostSVG />} />
                </TrayWidget>
              </ClickOutside> : null}

            {this.state.toggle === 'fourth' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  <TrayItemWidget model={{ type: "BlogPost" }} name="fourth" icon={<BlogPostSVG />} />
                  <TrayItemWidget model={{ type: "BlogPost" }} name="fourth" icon={<BlogPostSVG />} />
                </TrayWidget>
              </ClickOutside> : null}

            {this.state.toggle === 'fifth' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  <TrayItemWidget model={{ type: "BlogPost" }} name="fifth" icon={<BlogPostSVG />} />
                  <TrayItemWidget model={{ type: "BlogPost" }} name="fifth" icon={<BlogPostSVG />} />
                </TrayWidget>
              </ClickOutside> : null}

            <div
              className="diagram-layer"
              ref={ref => this.diagramRef = ref}
              onDrop={event => {
                var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));

                // var nodesCount = _.keys(
                //   this.props.app
                //     .getDiagramEngine()
                //     .getDiagramModel()
                //     .getNodes()
                // ).length;


                var node = null;


                switch (data.type) {
                  case "BlogPost": node = new BlogPostNodeModel(); break;
                  case "Calendar": node = new CalendarNodeModel(); break;
                  case "Download": node = new DownloadNodeModel(); break;
                  case "Generic": node = new GenericNodeModel(); break;
                  case "MembersArea": node = new MembersAreaNodeModel(); break;
                  case "OptIn": node = new OptInNodeModel(); break;
                  case "OrderPage": node = new OrderPageNodeModel(); break;
                  case "Popup": node = new PopupNodeModel(); break;
                  case "SalesPage": node = new SalesPageNodeModel(); break;
                  case "SalesVideo": node = new SalesVideoNodeModel(); break;
                  case "Survey": node = new SurveyNodeModel(); break;
                  case "ThankYou": node = new ThankYouNodeModel(); break;
                  case "Upsell": node = new UpsellNodeModel(); break;
                  case "Webinar": node = new WebinarNodeModel(); break;
                  case "WebinarReplay": node = new WebinarReplayNodeModel(); break;
                  default: break;
                }


                var points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
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
            >
              <RJD.DiagramWidget className="srd-demo-canvas" diagramEngine={this.props.app.getDiagramEngine()} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

