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

import * as _ from "lodash";
import { AdvancedLinkModel } from "../customLink";
import { EmailMarketingNodeModel } from './EmailMarketingNodeModel'

import { PointModel } from "storm-react-diagrams";


export class EmailMarketingNodeWidget extends React.Component {
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
    this.setState({ showSettings: true , showNotes: false });
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
      if (newItem instanceof EmailMarketingNodeModel) {
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
            <button className='btn-select-widget' onClick={this.showSettingsModal}><SettingsSVG /></button>
            <button className='btn-select-widget' onClick={this.showNotesModal}><NotesSVG /></button>
            <button className='btn-select-widget' onClick={this.cloneSelected}><CopySVG /></button>
            <button className='btn-select-widget' onClick={this.deleteNode}><DeleteSVG /></button>
            <button className='btn-select-widget' onClick={this.deleteAllLinks}><DeleteAllLinksSVG /></button>
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

        <ModalNodeWidget show={this.state.showNotes} handleClose={this.hideNotesModal}>
          <label className='label-create'>Notes</label>

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
        </ModalNodeWidget>


        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: -40,
              // color: '#fff',
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