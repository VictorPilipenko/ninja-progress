import * as React from "react";
import { PortWidget } from "storm-react-diagrams";
import ReactSVG from 'react-svg';
import ClickOutside from '../../../../../common/ClickOutside'
import ModalNodeWidget from '../../../../../common/ModalNodeWidget'

export class BlogPostNodeWidget extends React.Component {
  state = {
    show: false,
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

  render() {

    return (
      <>

        <ClickOutside
          onClickOutside={() => {
            this.setState({ show: false })
          }}
        >
          <Select show={this.state.show} handleClose={this.hideModal} expanded={this.state.expanded}>
            <button className='btn-select btn-select-copy' onClick={this.showSettingsModal}>settings</button>
            <button className='btn-select btn-select-copy'>Make a copy</button>
            <button className='btn-select btn-select-share'>Share</button>
            <button className='btn-select btn-select-delete'>Delete</button>
          </Select>
        </ClickOutside>

        <ModalNodeWidget show={this.state.showSettings} handleClose={this.hideSettingsModal}>
          <label className='label-create'>Create New Project</label>

          <label htmlFor="Name" className='label-input'>
            Name
          
          </label>
          <input
            id="Name"
            placeholder="Template Name"
            type="text"
            value={this.state.NewProjectWithTemplateName}
            onChange={this.handleChange}
          />
          {this.props.messageCreateProject && (
            <div className={`input-group`}>{this.props.messageCreateProject}</div>
          )}
          <button className='btn btn-1 create-project-button-in-modal' onClick={() => this.createNewProjectWithTemplate()}>Create Project With Template</button>
        </ModalNodeWidget>


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
      </>
    );
  }
}

//modalka, fuck yeah
const Select = ({ show, children }) => {
  const showHideClassName = show ? "select display-block" : "select display-none";

  return (
    <div className={showHideClassName}>
      <section className="select-main">
        {children}
      </section>
    </div>
  );
};