import * as React from "react";
// import * as _ from "lodash";
import { TrayWidget } from "./TrayWidget";
// import { Application } from "../Application";
import { TrayItemWidget } from "./TrayItemWidget";
import { DiagramWidget } from "storm-react-diagrams";
// import the custom models
import { DiamondNodeModel } from "../custom/DiamondNodeModel";

// import { connect } from 'react-redux'
// import { saveDiagram } from '../../../../store/actions/projects'
import domtoimage from 'dom-to-image';
// import { getDiagram } from '../../../../store/actions/projects'
// import { stringify } from 'flatted/esm';



export default class BodyWidget extends React.Component {

  saveDiagramHandle = () => {
    // let converted = stringify(this.props.app.getActiveDiagram())

    this.setState({ snackMsg: 'next', converted: this.props.app.getActiveDiagram() },
      () => (
        this.props.work.saveDiagram(this.props.work.funnelId, this.state)
      )
    )
  }

  render() {
    // console.log('this.props: ', this.props)
    return (
      <div className="body">
        <div className="header">
          <div className="title">Storm React Diagrams</div>
          <button onClick={() => console.log(this.props.app.getDiagramEngine().getDiagramModel())}>show diagram engine</button>
          <button onClick={() => console.log(this.props.app.getActiveDiagram())}>show getActiveDiagram</button>
          <button
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
          <button onClick={(e) => this.saveDiagramHandle(e)}>Save Diagram</button>
        </div>
        <div className="content">
          <TrayWidget>
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
            <TrayItemWidget model={{ type: "diamond" }} name="item" />
          </TrayWidget>
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

              if (data.type === "diamond") {
                node = new DiamondNodeModel();
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
            <DiagramWidget className="srd-demo-canvas" diagramEngine={this.props.app.getDiagramEngine()} />
          </div>
        </div>
      </div>
    );
  }
}

