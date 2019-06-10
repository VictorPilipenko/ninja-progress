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
import BlogPostSVG from '../../../../assets/pages/blog-post.svg'
import CalendarSVG from '../../../../assets/pages/calendar.svg'
import DownloadSVG from '../../../../assets/pages/download.svg'
import GenericSVG from '../../../../assets/pages/generic.svg'
import MembersAreaSVG from '../../../../assets/pages/members-area.svg'
import OptInSVG from '../../../../assets/pages/opt-in.svg'
import OrderPageSVG from '../../../../assets/pages/order-page.svg'
import PopupSVG from '../../../../assets/pages/popup.svg'
import SalesPageSVG from '../../../../assets/pages/sales-page.svg'
import SalesVideoSVG from '../../../../assets/pages/sales-video.svg'
import SurveySVG from '../../../../assets/pages/survey.svg'
import ThankYouSVG from '../../../../assets/pages/thank-you.svg'
import UpsellSVG from '../../../../assets/pages/upsell.svg'
import WebinarSVG from '../../../../assets/pages/webinar.svg'
import WebinarReplaySVG from '../../../../assets/pages/webinar-replay.svg'

import { AddToCartNodeModel } from "../custom/events/AddToCart/AddToCartNodeModel";
import { ClickButtonNodeModel } from "../custom/events/ClickButton/ClickButtonNodeModel";
import { CompleteFormNodeModel } from "../custom/events/CompleteForm/CompleteFormNodeModel";
import { GenericEventNodeModel } from "../custom/events/GenericEvent/GenericEventNodeModel";
import { PopUpBoxNodeModel } from "../custom/events/PopUpBox/PopUpBoxNodeModel";
import { PurchaseNodeModel } from "../custom/events/Purchase/PurchaseNodeModel";
import { ScrollNodeModel } from "../custom/events/Scroll/ScrollNodeModel";
import { WatchVideoNodeModel } from "../custom/events/WatchVideo/WatchVideoNodeModel";
import AddToCartSVG from '../../../../assets/Events/AddToCart.svg'
import ClickButtonSVG from '../../../../assets/Events/ClickButton.svg'
import CompleteFormSVG from '../../../../assets/Events/CompleteForm.svg'
import GenericEventSVG from '../../../../assets/Events/GenericEvent.svg'
import PopUpBoxSVG from '../../../../assets/Events/PopUpBox.svg'
import PurchaseSVG from '../../../../assets/Events/Purchase.svg'
import ScrollSVG from '../../../../assets/Events/Scroll.svg'
import WatchVideoSVG from '../../../../assets/Events/WatchVideo.svg'

import { AddTagNodeModel } from "../custom/emailMarketing/AddTag/AddTagNodeModel";
import { ConditionNodeModel } from "../custom/emailMarketing/Condition/ConditionNodeModel";
import { CustomActionNodeModel } from "../custom/emailMarketing/CustomAction/CustomActionNodeModel";
import { RemoveTagNodeModel } from "../custom/emailMarketing/RemoveTag/RemoveTagNodeModel";
import { SendEmailNodeModel } from "../custom/emailMarketing/SendEmail/SendEmailNodeModel";
import { SendNotificationNodeModel } from "../custom/emailMarketing/SendNotification/SendNotificationNodeModel";


import AddTagSVG from '../../../../assets/EmailMarketing/AddTag.svg'
import ConditionSVG from '../../../../assets/EmailMarketing/Condition.svg'
import CustomActionSVG from '../../../../assets/EmailMarketing/CustomAction.svg'
import RemoveTagSVG from '../../../../assets/EmailMarketing/RemoveTag.svg'
import SendEmailSVG from '../../../../assets/EmailMarketing/SendEmail.svg'
import SendNotificationSVG from '../../../../assets/EmailMarketing/SendNotification.svg'



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
    this.setState({
      snackMsg: 'next',
      converted: this.props.app.serialization(this.props.app.getDiagramEngine(), this.props.app.getDiagramEngine().getDiagramModel())
    },
      () => (
        this.props.work.saveTemplate(this.props.work.funnelId, this.state)
      )
    )
  }

  createTemplateHandle = () => {
    this.saveDiagramHandle()
    this.props.work.createTemplate(this.props.work.funnelId, this.state.templateName)
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

  nodeFactory(data) {
    switch (data.type) {
      case "BlogPost": return new BlogPostNodeModel();
      case "Calendar": return new CalendarNodeModel();
      case "Download": return new DownloadNodeModel();
      case "Generic": return new GenericNodeModel();
      case "MembersArea": return new MembersAreaNodeModel();
      case "OptIn": return new OptInNodeModel();
      case "OrderPage": return new OrderPageNodeModel();
      case "Popup": return new PopupNodeModel();
      case "SalesPage": return new SalesPageNodeModel();
      case "SalesVideo": return new SalesVideoNodeModel();
      case "Survey": return new SurveyNodeModel();
      case "ThankYou": return new ThankYouNodeModel();
      case "Upsell": return new UpsellNodeModel();
      case "Webinar": return new WebinarNodeModel();
      case "WebinarReplay": return new WebinarReplayNodeModel();
      case "AddToCart": return new AddToCartNodeModel();
      case "ClickButton": return new ClickButtonNodeModel();
      case "CompleteForm": return new CompleteFormNodeModel();
      case "GenericEvent": return new GenericEventNodeModel();
      case "PopUpBox": return new PopUpBoxNodeModel();
      case "Purchase": return new PurchaseNodeModel();
      case "Scroll": return new ScrollNodeModel();
      case "WatchVideo": return new WatchVideoNodeModel();
      case "AddTag": return new AddTagNodeModel();
      case "Condition": return new ConditionNodeModel();
      case "CustomAction": return new CustomActionNodeModel();
      case "RemoveTag": return new RemoveTagNodeModel();
      case "SendEmail": return new SendEmailNodeModel();
      case "SendNotification": return new SendNotificationNodeModel();

      default: return new AddToCartNodeModel();
    }
  }

  // createItemWidget(configElements) {
  //   return configElements.forEach(item => {
  //     engine.registerPortFactory(new PortFactory(item.name, config => new item.port()));
  //     engine.registerNodeFactory(new NodeFactory(item.name, item.widget, item.nodeModel, item.svg));
  //   })
  // }

  render() {

    // console.log(this.props.work.svg)

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
                  domtoimage.toPng(this.diagramRef)
                    .then(data => {
                      var img = new Image();
                      img.src = data;
                      var link = document.createElement('a');
                      link.download = 'my-diagram.png';
                      link.href = img.src;
                      link.click();
                    })
                    .catch(function (error) {
                      console.error('oops, something went wrong!', error);
                    });
                }}>
                Export PNG
              </button>


              {this.props.work.pathname.includes('diagram') ?
                <>
                  {/* <button
                    className="btn btn-1"
                    onClick={() => {
                      domtoimage.toBlob(this.diagramRef)
                        .then(data => {
                          let name = randomString({ length: 10 });
                          var file = new File([data], name);
                          this.saveDiagramHandle();
                          this.props.work.sendImageToCollaborate(this.props.work.funnelId, file);
                        })
                        .catch(function (error) {
                          console.error('oops, something went wrong!', error);
                        });
                    }}>
                    Create Link To Collaborate With Image
                  </button> // на будущее */}
                  <button className="btn btn-1" onClick={() => this.saveDiagramHandle()}>Save Diagram</button>
                  <button className="btn btn-1" onClick={this.showTemplateModal}>Save As Template</button>
                </>
                :
                null
                // <button className="btn btn-1" onClick={() => this.saveTemplateHandle()}>Update Template</button> // на будущее
              }


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
              {this.props.work.createTemplateMessage && (
                <div className={`input-group`}>{this.props.work.createTemplateMessage}</div>
              )}
              <button className='btn btn-1 create-project-button-in-modal' onClick={() => this.createTemplateHandle()}>Create Template</button>
            </Modal>

            <div className='panel-buttons'>
              {this.button('first', 'pages', 'panel-button panel-button-first')}
              {this.button('second', '2', 'panel-button')}
              {this.button('third', 'events', 'panel-button')}
              {this.button('fourth', 'EM', 'panel-button')}
              {this.button('fifth', '5', 'panel-button panel-button-last')}
            </div>

            {this.state.toggle === 'first' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  <TrayItemWidget model={{ type: "BlogPost" }} name="Blog post" icon={BlogPostSVG} />
                  <TrayItemWidget model={{ type: "Calendar" }} name="Calendar" icon={CalendarSVG} />
                  <TrayItemWidget model={{ type: "Download" }} name="Download" icon={DownloadSVG} />
                  <TrayItemWidget model={{ type: "Generic" }} name="Generic" icon={GenericSVG} />
                  <TrayItemWidget model={{ type: "MembersArea" }} name="Members area" icon={MembersAreaSVG} />
                  <TrayItemWidget model={{ type: "OptIn" }} name="Opt in" icon={OptInSVG} />
                  <TrayItemWidget model={{ type: "OrderPage" }} name="Order page" icon={OrderPageSVG} />
                  <TrayItemWidget model={{ type: "Popup" }} name="Popup" icon={PopupSVG} />
                  <TrayItemWidget model={{ type: "SalesPage" }} name="SalesPage" icon={SalesPageSVG} />
                  <TrayItemWidget model={{ type: "SalesVideo" }} name="SalesVideo" icon={SalesVideoSVG} />
                  <TrayItemWidget model={{ type: "Survey" }} name="Survey" icon={SurveySVG} />
                  <TrayItemWidget model={{ type: "ThankYou" }} name="ThankYou" icon={ThankYouSVG} />
                  <TrayItemWidget model={{ type: "Upsell" }} name="Upsell" icon={UpsellSVG} />
                  <TrayItemWidget model={{ type: "Webinar" }} name="Webinar" icon={WebinarSVG} />
                  <TrayItemWidget model={{ type: "WebinarReplay" }} name="WebinarReplay" icon={WebinarReplaySVG} />
                </TrayWidget>
              </ClickOutside> : null}

            {this.state.toggle === 'second' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  {/* <TrayItemWidget model={{ type: "AddTag" }} name="AddTag" icon={AddTagSVG} /> */}
                </TrayWidget>
              </ClickOutside> : null}

            {this.state.toggle === 'third' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  <TrayItemWidget model={{ type: "AddToCart" }} name="AddToCart" icon={AddToCartSVG} />
                  <TrayItemWidget model={{ type: "ClickButton" }} name="ClickButton" icon={ClickButtonSVG} />
                  <TrayItemWidget model={{ type: "CompleteForm" }} name="CompleteForm" icon={CompleteFormSVG} />
                  <TrayItemWidget model={{ type: "GenericEvent" }} name="GenericEvent" icon={GenericEventSVG} />
                  <TrayItemWidget model={{ type: "PopUpBox" }} name="PopUpBox" icon={PopUpBoxSVG} />
                  <TrayItemWidget model={{ type: "Purchase" }} name="Purchase" icon={PurchaseSVG} />
                  <TrayItemWidget model={{ type: "Scroll" }} name="Scroll" icon={ScrollSVG} />
                  <TrayItemWidget model={{ type: "WatchVideo" }} name="WatchVideo" icon={WatchVideoSVG} />
                </TrayWidget>
              </ClickOutside> : null}

            {this.state.toggle === 'fourth' ?
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ show: false })
                }}
              >
                <TrayWidget show={this.state.show}>
                  <TrayItemWidget model={{ type: "AddTag" }} name="AddTag" icon={AddTagSVG} />
                  <TrayItemWidget model={{ type: "Condition" }} name="Condition" icon={ConditionSVG} />
                  <TrayItemWidget model={{ type: "CustomAction" }} name="CustomAction" icon={CustomActionSVG} />
                  <TrayItemWidget model={{ type: "RemoveTag" }} name="RemoveTag" icon={RemoveTagSVG} />
                  <TrayItemWidget model={{ type: "SendEmail" }} name="SendEmail" icon={SendEmailSVG} />
                  <TrayItemWidget model={{ type: "SendNotification" }} name="SendNotification" icon={SendNotificationSVG} />
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
              className="diagram-layer"
              ref={ref => this.diagramRef = ref}
              onDrop={event => {
                var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));

                const node = this.nodeFactory(data);

                const points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);

                node.x = points.x;
                node.y = points.y;

                this
                  .props
                  .app
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

