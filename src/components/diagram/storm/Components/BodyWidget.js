import * as React from "react";
import { TrayWidget } from "./TrayWidget";
import { TrayItemWidget } from "./TrayItemWidget";
import * as RJD from "storm-react-diagrams";
import domtoimage from 'dom-to-image';
import ClickOutside from '../../../common/ClickOutside'
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
    toggle: 'first',
    background: 'linear-gradient(90deg, #e62d24 0%, #fd8f21 100%)',
  }

  button = e => this.setState({
    toggle: e.target.name,
    background: 'linear-gradient(90deg, #e62d24 0%, #fd8f21 100%)',
    show: true,
  });

  //linear-gradient(90deg, #e62d24 0%, #fd8f21 100%)

  saveDiagramHandle = () => {
    // let test = this.props.app.getElements();
    // let mass = Object.entries(test)
    // let converted = [];
    // mass.map(item => {
    //   converted.push({
    //     x: item[1].x,
    //     y: item[1].y,
    //     type: item[1].type,
    //   })
    // })
    this.setState({
      snackMsg: 'next',
      converted: this.props.app.serialization(this.props.app.getDiagramEngine(), this.props.app.getDiagramEngine().getDiagramModel())
    },
      () => (
        this.props.work.saveDiagram(this.props.work.funnelId, this.state)
      )
    )
  }

  render() {

    return (
      <div className="body">
        <div className="header">
          {/* <div className="title">Storm React Diagrams</div> */}



          {/* <button onClick={() => console.log(this.props.app.getDiagramEngine().getDiagramModel())}>show diagram engine</button> */}

          {/* <button onClick={() => this.setState({
            serialization: this.props.app.serialization(this.props.app.getDiagramEngine(), this.props.app.getDiagramEngine().getDiagramModel())
          }, () => console.log(this.state.serialization))}>show serialization</button>

          {
            this.state.serialization ?
              <button onClick={() => this.setState({
                deSerialization: this.props.app.deSerialization(this.props.app.getDiagramEngine(), this.state.serialization)
              }, () => console.log(this.state.deSerialization))}>show deSerialization</button>
              : null
          } */}
          <div className='diagram-header-buttons-wrapper'>
            <button
              className="btn btn-1"
              onClick={(e) => {
                domtoimage.toPng(this.diagramRef)
                  .then(function (dataUrl) {
                    var img = new Image();
                    img.src = dataUrl;
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
            <button className="btn btn-1" onClick={() => this.saveDiagramHandle()}>Save Diagram</button>
          </div>

        </div>
        <div className="content">

          <div className='panel-buttons'>

            <button
              name={'first'}
              onClick={e => this.button(e)}
              className="panel-button panel-button-first"
              style={{ background: this.state.toggle === 'first' ? this.state.background : '#212939' }}
            >
              pages
            </button>

            <button
              name={'second'}
              onClick={e => this.button(e)}
              className="panel-button panel-button-last"
              style={{ background: this.state.toggle === 'second' ? this.state.background : '#212939' }}
            >
              button
            </button>
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

              if (data.type === "BlogPost") {
                node = new BlogPostNodeModel();
              }
              if (data.type === "Calendar") {
                node = new CalendarNodeModel();
              }
              if (data.type === "Download") {
                node = new DownloadNodeModel();
              }
              if (data.type === "Generic") {
                node = new GenericNodeModel();
              }
              if (data.type === "MembersArea") {
                node = new MembersAreaNodeModel();
              }
              if (data.type === "OptIn") {
                node = new OptInNodeModel();
              }
              if (data.type === "OrderPage") {
                node = new OrderPageNodeModel();
              }
              if (data.type === "Popup") {
                node = new PopupNodeModel();
              }
              if (data.type === "SalesPage") {
                node = new SalesPageNodeModel();
              }
              if (data.type === "SalesVideo") {
                node = new SalesVideoNodeModel();
              }
              if (data.type === "Survey") {
                node = new SurveyNodeModel();
              }
              if (data.type === "ThankYou") {
                node = new ThankYouNodeModel();
              }
              if (data.type === "Upsell") {
                node = new UpsellNodeModel();
              }
              if (data.type === "Webinar") {
                node = new WebinarNodeModel();
              }
              if (data.type === "WebinarReplay") {
                node = new WebinarReplayNodeModel();
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
    );
  }
}

