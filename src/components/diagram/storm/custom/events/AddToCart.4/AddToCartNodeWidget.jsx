import * as React from "react";
import { PortWidget } from "storm-react-diagrams";
import { ReactComponent as AddToCartSVG } from '../../../../../../assets/Events/AddToCart.svg';
import './AddToCartNodeWidget.css'


export class AddToCartNodeWidget extends React.Component {
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
          <AddToCartSVG style={{ padding: 5, width: 40, height: 40 }} />
          <div className='add-to-cart-model-text-wrapper'>
            <p className='add-to-cart-model-text'>sssssss</p>
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