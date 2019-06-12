import * as React from "react";
import { PortWidget } from "storm-react-diagrams";
import ReactSVG from 'react-svg';
import ClickOutside from '../../../../common/ClickOutside'
import ModalNodeWidget from '../../../../common/ModalNodeWidget'

import { ReactComponent as CopySVG } from '../../../../../assets/selectForWidget/copy.svg';
import { ReactComponent as DeleteAllLinksSVG } from '../../../../../assets/selectForWidget/delete-all-links.svg';
import { ReactComponent as DeleteSVG } from '../../../../../assets/selectForWidget/delete.svg';
import { ReactComponent as NotesSVG } from '../../../../../assets/selectForWidget/notes.svg';
import { ReactComponent as SettingsSVG } from '../../../../../assets/selectForWidget/settings.svg';


export class PageNodeWidget extends React.Component {
  state = {
    show: false,
    label: this.props.node.extras.named,
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
  }, () =>
      this.props.node.extras.setNameExtras && this.props.node.extras.setNameExtras(this.state.label)
      ||
      this.props.node.setName && this.props.node.setName(this.state.label)
  );


  render() {
    return (
      <>

        <ClickOutside
          onClickOutside={() => {
            this.setState({ show: false })
          }}
        >
          <Select show={this.state.show}>
            <button className='btn-select' style={{ padding: 6 }} onClick={this.showSettingsModal}><SettingsSVG /></button>
            <button className='btn-select' style={{ padding: 6 }} ><NotesSVG /></button>
            <button className='btn-select' style={{ padding: 6 }} ><CopySVG /></button>
            <button className='btn-select' style={{ padding: 6 }} ><DeleteSVG /></button>
            <button className='btn-select' style={{ padding: 6 }} ><DeleteAllLinksSVG /></button>
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