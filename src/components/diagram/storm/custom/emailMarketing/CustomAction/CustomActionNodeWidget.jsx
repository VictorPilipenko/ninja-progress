import * as React from "react";
import { PortWidget } from "storm-react-diagrams";
import './CustomActionNodeWidget.css';
import ReactSVG from 'react-svg';


export class CustomActionNodeWidget extends React.Component {
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
        <div className='add-to-cart-model-wrapper'>
          <div style={{ padding: 5, width: 40, height: 40 }}>
            <ReactSVG src={this.props.svg} beforeInjection={svg => {
              svg.setAttribute('style', 'width: 40px; height: 40px;')
            }} />
          </div>
          <div className='add-to-cart-model-text-wrapper'>
            <p className='add-to-cart-model-text'>test</p>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: 19,
            left: -15,
          }}
        >
          <PortWidget name="left" node={this.props.node} />
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: -14,
            left: 75,
          }}
        >
          <PortWidget name="top" node={this.props.node} />
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: 19,
            left: 152,
          }}
        >
          <PortWidget name="right" node={this.props.node} />
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: 49,
            left: 75,
          }}
        >
          <PortWidget name="bottom" node={this.props.node} />
        </div>

      </div>
    );
  }
}