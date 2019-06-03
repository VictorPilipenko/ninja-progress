import * as React from "react";
import { PortWidget } from "storm-react-diagrams";
import "./DiamondNodeWidget.css";
import { ReactComponent as WebinarReplaySVG } from '../../../../assets/Webinar_Replay.svg';


export class DiamonNodeWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // size: 90,
      node: null
    };
  }

  render() {
    return (
      <div
        className="diamond-node"
        style={{
          position: "relative",
        }}
      >
        <WebinarReplaySVG />

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: 75,
            left: -14
          }}
        >
          <PortWidget name="left" node={this.props.node} />
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            left: 55,
            top: -13
          }}
        >
          <PortWidget name="top" node={this.props.node} />
        </div>
        
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            left: 121,
            top: 75
          }}
        >
          <PortWidget name="right" node={this.props.node} />
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            left: 55,
            top: 160
          }}
        >
          <PortWidget name="bottom" node={this.props.node} />
        </div>

      </div>
    );
  }
}