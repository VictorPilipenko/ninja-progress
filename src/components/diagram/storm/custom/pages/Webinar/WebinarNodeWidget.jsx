import * as React from "react";
import { PortWidget } from "storm-react-diagrams";
import WebinarSVG from '../../../../../../assets/pages/webinar.svg';
import ReactSVG from 'react-svg';

export class WebinarNodeWidget extends React.Component {
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
        <ReactSVG src={WebinarSVG} />

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