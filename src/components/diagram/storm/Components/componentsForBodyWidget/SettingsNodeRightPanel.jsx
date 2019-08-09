import * as React from "react";
import randomString from "random-string";
import ModalNodeWidget from "../../../../common/ModalNodeWidget";
import './SettingsNodeRightPanel.css'


export default class SettingsNodeRightPanel extends React.Component { 

  state = {
    labelNode: ''
      // this.props.work.showSettingsWidgetModel &&
      // this.props.work.showSettingsWidgetModel.extras &&
      // this.props.work.showSettingsWidgetModel.extras.named
  };

  handleChangeNode = e =>
    this.setState(
      {
        labelNode: e.target.value
      },
      () =>
      {
         (this.props.work.showSettingsWidgetModel.extras.setNameExtras &&
          this.props.work.showSettingsWidgetModel.extras.setNameExtras(
            this.state.labelNode
          )) ||
        (this.props.work.showSettingsWidgetModel.setName &&
          this.props.work.showSettingsWidgetModel.setName(this.state.labelNode))
      }
       
    );

  saveDiagramThenCloseSettingModal = file =>
    this.setState(
      {
        snackMsg: "next",
        converted: this.props.app.serialization(
          this.props.work.showSettingsWidgetEngine
        )
      },
      () => {
        this.props.work.saveDiagramThenShowOrHideSettingsModal(
          this.props.work.funnelId,
          this.state,
          file,
          false
        );
        this.setState({ 
          labelNode: ''
            // this.props.work.showSettingsWidgetModel &&
            // this.props.work.showSettingsWidgetModel.extras &&
            // this.props.work.showSettingsWidgetModel.extras.named
        })
      }
    );

  render() {
    return (
      <ModalNodeWidget
        show={this.props.work.showSettingsWidgetBoolean}
        handleClose={() => {
          const name = randomString({ length: 10 });
          const file = new File(["test"], name, {
            type: "image/png"
          });
          this.saveDiagramThenCloseSettingModal(file);
        }}
      >
        <label className="label-create-widget-settings">Settings</label>
        <div className="modal-content-wrapper">
          <label htmlFor="Name" className="label-input">
            Name
          </label>
          <textarea
            className='node-panel-textarea-input'
            id="Name"
            placeholder="Label Name"
            type="text"
            value={this.state.labelNode}
            onChange={this.handleChangeNode}
          />
        </div>
      </ModalNodeWidget>
    );
  }
}
