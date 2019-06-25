import * as React from "react";
import domtoimage from 'dom-to-image';
import randomString from 'random-string';

import ModalNodeWidget from '../../../../common/ModalNodeWidget'


export default class SettingsNodeRightPanel extends React.Component {

  state = {
    labelNode: ''
  }

  handleChangeNode = e => this.setState({
    labelNode: e.target.value
  }
    , () =>
      this.props.work.showSettingsWidgetModel.extras.setNameExtras && this.props.work.showSettingsWidgetModel.extras.setNameExtras(this.state.labelNode)
      ||
      this.props.work.showSettingsWidgetModel.setName && this.props.work.showSettingsWidgetModel.setName(this.state.labelNode)
  );

  saveDiagramThenCloseSettingModal = file => this.setState({
    snackMsg: 'next',
    converted: this.props.app.serialization(this.props.work.showSettingsWidgetEngine)
  }, () => {
    this.props.work.saveDiagramThenShowSettingsModal(this.props.work.funnelId, this.state, file, false)
  });

  render() {
    return (
      <ModalNodeWidget
        show={this.props.work.showSettingsWidgetBoolean}
        handleClose={() => {
          let diagram = document.getElementById('diagram-layer');
          domtoimage.toBlob(diagram)
            .then(data => {
              let name = randomString({ length: 10 });
              var file = new File([data], name, { type: "image/svg" });
              this.saveDiagramThenCloseSettingModal(file);
            })
            .catch(function (error) {
              console.error('oops, something went wrong!', error);
            })
        }}
      >
        <label className='label-create-widget-settings'>Settings</label>
        <div className='modal-content-wrapper'>
          <label htmlFor="Name" className='label-input'>
            Name
          </label>
          <input
            id="Name"
            placeholder="Label Name"
            type="text"
            value={this.state.labelNode}
            onChange={this.handleChangeNode}
          />
        </div>
      </ModalNodeWidget >
    );
  }
}