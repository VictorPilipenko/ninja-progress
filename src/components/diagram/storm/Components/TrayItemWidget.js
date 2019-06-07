import * as React from "react";

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
          // className="tray-item"
          >
            <div style={{ width: '100%' }}>
              {/* {this.props.icon} */}
              <img src={this.props.icon} alt='icon' />
            </div>
          </div>
        </div>
        {this.props.name}
      </div>
    );
  }
}
