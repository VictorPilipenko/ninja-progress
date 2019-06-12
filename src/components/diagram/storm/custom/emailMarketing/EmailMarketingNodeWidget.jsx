import * as React from "react";
import { PortWidget } from "storm-react-diagrams";
import ReactSVG from 'react-svg';
import ClickOutside from '../../../../common/ClickOutside'
import ModalNodeWidget from '../../../../common/ModalNodeWidget'
import './EmailMarketingNodeWidget.css'

import { ReactComponent as CopySVG } from '../../../../../assets/selectForWidget/copy.svg';
import { ReactComponent as DeleteAllLinksSVG } from '../../../../../assets/selectForWidget/delete-all-links.svg';
import { ReactComponent as DeleteSVG } from '../../../../../assets/selectForWidget/delete.svg';
import { ReactComponent as NotesSVG } from '../../../../../assets/selectForWidget/notes.svg';
import { ReactComponent as SettingsSVG } from '../../../../../assets/selectForWidget/settings.svg';



export class EmailMarketingNodeWidget extends React.Component {
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
            <button className='btn-select' style={{padding: 6 }} onClick={this.showSettingsModal}><SettingsSVG /></button>
            <button className='btn-select' style={{padding: 6 }} ><NotesSVG /></button>
            <button className='btn-select' style={{padding: 6 }} ><CopySVG /></button>
            <button className='btn-select' style={{padding: 6 }} ><DeleteSVG /></button>
            <button className='btn-select' style={{padding: 6 }} ><DeleteAllLinksSVG /></button>
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
      <section className="select-main-modal-node-widget-horizontally up-arrow-horizontally ">
        {children}
      </section>
    </div>
  );
};