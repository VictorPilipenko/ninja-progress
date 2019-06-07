import * as React from "react";
import { PortWidget } from "storm-react-diagrams";
import WebinarReplaySVG from '../../../../../../assets/pages/webinar-replay.svg';
import ReactSVG from 'react-svg';

export class WebinarReplayNodeWidget extends React.Component {
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
        // className="diamond-node"
        style={{
          position: "relative",
        }}
      >
        <ReactSVG src={WebinarReplaySVG} />

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: 55,
            left: -13,
          }}
        >
          <PortWidget name="left" node={this.props.node} />
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: -13,
            left: 38,
          }}
        >
          <PortWidget name="top" node={this.props.node} />
        </div>
        
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: 55,
            left: 90,
          }}
        >
          <PortWidget name="right" node={this.props.node} />
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: 119,
            left: 38,
          }}
        >
          <PortWidget name="bottom" node={this.props.node} />
        </div>

      </div>
    );
  }
}