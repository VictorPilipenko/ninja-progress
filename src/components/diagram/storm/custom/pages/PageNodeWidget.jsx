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

import { PointModel } from "storm-react-diagrams";


import * as _ from "lodash";
import { AdvancedLinkModel } from "../customLink";
import { PageNodeModel } from './PageNodeModel'

export class PageNodeWidget extends React.Component {
  state = {
    show: false,
    label: this.props.node.extras.named,
    notes: this.props.node.extras.notesd,
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showSettingsModal = () => {
    this.setState({ showSettings: true, showNotes: false });
  };

  hideSettingsModal = () => {
    this.setState({ showSettings: false });
  };

  showNotesModal = () => {
    this.setState({ showNotes: true, showSettings: false });
  };

  hideNotesModal = () => {
    this.setState({ showNotes: false });
  };

  handleChange = e => this.setState({
    label: e.target.value
  }, () =>
      this.props.node.extras.setNameExtras && this.props.node.extras.setNameExtras(this.state.label)
      ||
      this.props.node.setName && this.props.node.setName(this.state.label)
  );

  handleChangeNotes = e => this.setState({
    notes: e.target.value
  }, () =>
      this.props.node.extras.setNotesExtras && this.props.node.extras.setNotesExtras(this.state.notes)
      ||
      this.props.node.setNotes && this.props.node.setNotes(this.state.notes)
  );

  deleteNode = e => {
    this.simulateKey(46, "up");
  }

  simulateKey(keyCode, type) {
    var evtName = (typeof (type) === "string") ? "key" + type : "keydown";
    var event = document.createEvent("HTMLEvents");
    event.initEvent(evtName, true, false);
    event.keyCode = keyCode;
    document.dispatchEvent(event);
  }

  cloneSelected = () => {
    let { engine } = this.props;
    let offset = { x: 100, y: 100 };
    let model = engine.getDiagramModel();
    let itemMap = {};
    _.forEach(model.getSelectedItems(), (item) => {
      let newItem = item.clone(itemMap);
      // offset the nodes slightly
      if (newItem instanceof PageNodeModel) {
        newItem.setPosition(newItem.x + offset.x, newItem.y + offset.y);
        model.addNode(newItem);
        this.forceUpdate();
      } else if (newItem instanceof AdvancedLinkModel) {
        // offset the link points
        newItem.getPoints().forEach(p => {
          p.updateLocation({ x: p.getX() + offset.x, y: p.getY() + offset.y });
        });
        model.addLink(newItem);
      }
      newItem.selected = false;
    });
    this.hideModal();
    this.forceUpdate();
    document.getElementById("diagram-layer").click();
  }

  deleteAllLinks = () => {
    _.forEach(this.props.engine.getDiagramModel().getSelectedItems(), (item) => {
      if (item instanceof PointModel) {
        item.parent.remove()
        // console.log(item.parent.sourcePort)
      }
    })
    document.getElementById("diagram-layer").click();
  }


  render() {
    return (
      <>
        <ClickOutside
          onClickOutside={() => {
            this.setState({ show: false })
          }}
        >
          <Select show={this.state.show}>
            <button className='btn-select-widget' onClick={this.showSettingsModal} title={'Settings'}><SettingsSVG /></button>
            <button className='btn-select-widget' onClick={this.showNotesModal} title={'Notes'}><NotesSVG /></button>
            <button className='btn-select-widget' onClick={this.cloneSelected} title={'Copy'}><CopySVG /></button>
            <button className='btn-select-widget' onClick={this.deleteNode} title={'Delete'}><DeleteSVG /></button>
            <button className='btn-select-widget' onClick={this.deleteAllLinks} title={'Delete All Links'}><DeleteAllLinksSVG /></button>
          </Select>
        </ClickOutside>

        <ModalNodeWidget show={this.state.showSettings} handleClose={this.hideSettingsModal}>
          <label className='label-create-widget-settings'>Settings</label>
          <div className='modal-content-wrapper'>
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
          </div>
        </ModalNodeWidget>

        <ModalNodeWidget show={this.state.showNotes} handleClose={this.hideNotesModal}>
          <label className='label-create-widget-settings'>Notes</label>
          <div className='modal-content-wrapper'>
            <label htmlFor="Notes" className='label-input'>
              Notes
          </label>
            <textarea
              style={{
                height: 200
              }}
              id="Notes"
              placeholder="Your Notes"
              type="text"
              value={this.state.notes}
              onChange={this.handleChangeNotes}
            />
          </div>
        </ModalNodeWidget>


        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: -36,
              fontSize: 13,
              color: '#212939',
              fontWeight: 500
            }}
          >
            {this.state.label ? this.state.label : this.props.node.type}
          </div>

          <div
            style={{
              position: "relative",
            }}
            onClick={this.showModal}
            title={this.state.label ? this.state.label : this.props.node.type}
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