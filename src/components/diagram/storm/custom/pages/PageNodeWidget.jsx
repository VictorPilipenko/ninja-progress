import * as React from "react";
import { PortWidget } from "storm-react-diagrams";
import ReactSVG from 'react-svg';
import ClickOutside from '../../../../common/ClickOutside'
import ModalNodeWidget from '../../../../common/ModalNodeWidget'

export class PageNodeWidget extends React.Component {
  state = {
    show: false,
    label: this.props.node.extras.name,
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showSettingsModal = () => {
    this.setState({ showSettings: true });
  };

  hideSettingsModal = () => {
    this.setState({ showSettings: false });
  };

  handleChange = e => this.setState({
    label: e.target.value
  });


  render() {

    console.log(this.props)

    return (
      <>

        <ClickOutside
          onClickOutside={() => {
            this.setState({ show: false })
          }}
        >
          <Select show={this.state.show} handleClose={this.hideModal} expanded={this.state.expanded}>
            <button className='btn-select' onClick={this.showSettingsModal}>1</button>
            <button className='btn-select'>2</button>
            <button className='btn-select'>3</button>
            <button className='btn-select'>4</button>
          </Select>
        </ClickOutside>

        <ModalNodeWidget show={this.state.showSettings} handleClose={this.hideSettingsModal}>
          <label className='label-create'>Settings</label>

          <label htmlFor="Name" className='label-input'>
            Name
          </label>
          <input
            id="Name"
            placeholder="Label Name"
            type="text"
            value={this.state.label}
            onChange={this.handleChange}
          />
          <button onClick={() => this.props.node.extras.setName(this.state.label)}>Update</button>
        </ModalNodeWidget>


        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: -40,
              color: '#fff',
            }}
          >
            {this.state.label}
          </div>


          <div
            style={{
              position: "relative",
            }}
            onClick={this.showModal}
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
        </div>
      </>
    );
  }
}

//modalka, fuck yeah
const Select = ({ show, children }) => {
  const showHideClassName = show ? "select-modal-node-widget display-block" : "select-modal-node-widget display-none";

  return (
    <div className={showHideClassName}>
      <section className="select-main-modal-node-widget  up-arrow ">
        {children}
      </section>
    </div>
  );
};