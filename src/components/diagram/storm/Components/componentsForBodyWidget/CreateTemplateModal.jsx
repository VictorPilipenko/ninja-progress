import * as React from "react";
import domtoimage from 'dom-to-image';
import randomString from 'random-string';

import Modal from '../../../../common/Modal/Modal'


export default class CreateTemplateModal extends React.Component {
  state = {
    templateName: ''
  }

  showTemplateModal = () => this.setState({ showTemplateModal: true }, () => this.hideSelect());
  hideTemplateModal = () => this.setState({ showTemplateModal: false });

  saveDiagramThenCreateTemplate = file => this.setState({
    snackMsg: 'next',
    converted: this.props.app.serialization(this.props.app.getDiagramEngine().getDiagramModel())
  }, () => {
    this.props.work.saveDiagramThenCreateTemplate(this.props.work.funnelId, this.state, file, this.state.templateName)
  });

  render() {
    return (
      <Modal show={this.state.showTemplateModal} handleClose={this.hideTemplateModal}>
        <label className='label-create'>Create Template</label>

        <label htmlFor="Name" className='label-input'>
          Name
        </label>
        <input
          id="Name"
          placeholder="Template Name"
          type="text"
          value={this.state.templateName}
          onChange={this.handleChange}
          name='templateName'
        />
        {this.props.work.createTemplateMessage && (
          <div className={`input-group`}>{this.props.work.createTemplateMessage}</div>
        )}
        <button
          className='btn btn-1 create-project-button-in-modal'
          onClick={() => {
            let diagram = document.getElementById('diagram-layer');
            domtoimage.toBlob(diagram)
              .then(data => {
                let name = randomString({ length: 10 });
                var file = new File([data], name, { type: "image/svg" });
                this.saveDiagramThenCreateTemplate(file);
              })
              .catch(function (error) {
                console.error('oops, something went wrong!', error);
              });
          }}
        >
          Create Template
        </button>
      </Modal>

    );
  }
}