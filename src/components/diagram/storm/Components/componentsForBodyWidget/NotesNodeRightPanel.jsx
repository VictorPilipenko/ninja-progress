import * as React from "react";
import domtoimage from 'dom-to-image';
import randomString from 'random-string';

import ModalNodeWidget from '../../../../common/ModalNodeWidget'


export default class NotesNodeRightPanel extends React.Component {

  state = {
    note: '',
  }

  handleChangeNote = e => this.setState({
    note: e.target.value
  }, () => {
    document.getElementById("diagram-layer").click()
  });

  addNoteToNotebook = () => {
    this.setState({
      notebook: this.props.work.showNotesWidgetModel && this.props.work.showNotesWidgetModel.extras.notesd || [],
    }, () => {
      if (this.state.note.length > 0) {
        let notebook = this.state.notebook
        console.log(notebook)

        notebook.push(this.state.note)

        this.props.work.showNotesWidgetModel.extras.setNotesExtras && this.props.work.showNotesWidgetModel.extras.setNotesExtras(notebook)
          ||
          this.props.work.showNotesWidgetModel.setNotes && this.props.work.showNotesWidgetModel.setNotes(notebook)

        document.getElementById("diagram-layer").click()

        this.setState({ note: '' })
      }
    })

  };

  saveDiagramThenCloseSettingModal = file => this.setState({
    snackMsg: 'next',
    converted: this.props.app.serialization(this.props.work.showNotesWidgetEngine)
  }, () => {
    this.props.work.saveDiagramThenShowOrHideNotesModal(this.props.work.funnelId, this.state, file, false)
  });

  delete = index => {
    this.props.work.showNotesWidgetModel.extras.notesd.splice(index, 1)
    document.getElementById("diagram-layer").click()
  }

  render() {
    console.log('NotesNodeRightPanel props: ', this.props.work.showNotesWidgetModel && this.props.work.showNotesWidgetModel.extras.notesd)

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
            Note
          </label>

          <textarea
            style={{
              height: 100,
              borderRadius: 5,
              border: '1px solid rgb(191, 207, 233)',
              padding: 10,
              maxWidth: '90%',
              minWidth: '90%',
              width: '90%',
            }}
            id="Notes"
            placeholder="Start typing your note.."
            type="text"
            value={this.state.note}
            onChange={this.handleChangeNote}
          />

          <button
            className='btn btn-1'
            onClick={() => this.addNoteToNotebook()}
            style={{
              height: 30,
              width: 120,
              margin: '10px auto',
            }}
          >
            Add Note
          </button>


          <div style={{
            height: 600,
            overflow: 'auto'
          }}>
            {
              this.props.work.showNotesWidgetModel &&
              this.props.work.showNotesWidgetModel.extras &&
              this.props.work.showNotesWidgetModel.extras.notesd &&
              this.props.work.showNotesWidgetModel.extras.notesd.map((item, index) =>
                // console.log(item)
                <div style={{
                  position: 'relative',
                  margin: 5,
                }}>
                  <textarea
                    key={index}
                    style={{
                      // height: 100,
                      borderRadius: 5,
                      border: '1px solid rgb(191, 207, 233)',
                      padding: 10,
                      backgroundColor: '#ffefc1',
                      maxWidth: '90%',
                      minWidth: '90%',
                      width: '90%',
                    }}
                    id="Notes"
                    placeholder="Start typing your note.."
                    type="text"
                    value={item}
                  // onChange={this.handleChangeNote}
                  />
                  <button
                    onClick={() => this.delete(index)}
                    style={{
                      position: 'absolute',
                      top: -6,
                      left: -10,
                      border: 0,
                      cursor: 'pointer',
                      margin: 'inherit',
                      padding: '0px 4px 2px 4px',
                      borderRadius: '35%',
                      fontSize: 14,
                      backgroundColor: '#ffabab',
                    }}
                    title={'Delete Note'}
                  >
                    x
                  </button>
                </div>
              )
            }
          </div>

        </div>
      </ModalNodeWidget >
    );
  }
}