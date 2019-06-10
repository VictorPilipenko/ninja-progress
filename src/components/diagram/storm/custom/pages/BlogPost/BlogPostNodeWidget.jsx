import * as React from "react";
import { PortWidget } from "storm-react-diagrams";
import ReactSVG from 'react-svg';

export class BlogPostNodeWidget extends React.Component {
  render() {
    return (
      <div
        style={{
          position: "relative",
        }}
      >
        <ReactSVG src={this.props.svg} />

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