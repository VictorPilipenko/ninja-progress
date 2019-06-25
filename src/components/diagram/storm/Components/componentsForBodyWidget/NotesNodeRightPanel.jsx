import * as React from "react";
import domtoimage from 'dom-to-image';
import randomString from 'random-string';

import ModalNodeWidget from '../../../../common/ModalNodeWidget'


export default class NotesNodeRightPanel extends React.Component {

  state = {
    notes: this.props.work.showNotesWidgetModel && this.props.work.showNotesWidgetModel.extras.nodesd
  }

  handleChangeNotes = e => this.setState({
    notes: e.target.value
  }
    , () =>
      this.props.work.showNotesWidgetModel.extras.setNotesExtras && this.props.work.showNotesWidgetModel.extras.setNotesExtras(this.state.notes)
      ||
      this.props.work.showNotesWidgetModel.setNotes && this.props.work.showNotesWidgetModel.setNotes(this.state.notes)
  );

  saveDiagramThenCloseSettingModal = file => this.setState({
    snackMsg: 'next',
    converted: this.props.app.serialization(this.props.work.showNotesWidgetEngine)
  }, () => {
    this.props.work.saveDiagramThenShowOrHideNotesModal(this.props.work.funnelId, this.state, file, false)
  });

  render() {
    console.log('NotesNodeRightPanel props', this.props)

    return (
      <ModalNodeWidget
        show={this.props.work.showNotesWidgetBoolean}
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
            value={this.props.work.showNotesWidgetModel && this.props.work.showNotesWidgetModel.extras.nodesd}
            onChange={this.handleChangeNotes}
          />
        </div>
      </ModalNodeWidget >
    );
  }
}