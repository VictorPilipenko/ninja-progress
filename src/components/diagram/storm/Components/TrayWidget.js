import * as React from "react";

export class TrayWidget extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const showHideClassName = this.props.show ? "select display-block" : "select display-none";

    return (
      <div className={showHideClassName}>
        <div className='tray-wrapper'>
          <input
            // id="NameFunnel"
            // placeholder="Funnel Name"
            type="text"
            name='search'
          // value={this.state.funnelName}
          // onChange={this.handleChange}
          />
          <div className='tray'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}