import * as React from "react";
import ReactSVG from 'react-svg';

export class TrayItemWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='tray-item-body'>
        <div className='tray-item-wrapper'>
          <div
            draggable={true}
            onDragStart={event => {
              event.dataTransfer.setData("storm-diagram-node", JSON.stringify(this.props.model));
            }}
          >
            <div style={{ width: '100%' }}>
              <ReactSVG src={this.props.icon} />
            </div>
          </div>
        </div>
        {this.props.name}
      </div>
    );
  }
}
