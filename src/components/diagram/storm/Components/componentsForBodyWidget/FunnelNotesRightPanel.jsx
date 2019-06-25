import * as React from "react";
import domtoimage from 'dom-to-image';
import randomString from 'random-string';

import ModalNodeWidget from '../../../../common/ModalNodeWidget'

import { ReactComponent as ArrowSelectSVG } from '../../../../../assets/ArrowSelect.svg'
import { ReactComponent as LogoWidgetSVG } from '../../../../../assets/logo-widget.svg'
import { ReactComponent as MenuWidgetSVG } from '../../../../../assets/menu-widget.svg'
import { ReactComponent as ShareFunnelSVG } from '../../../../../assets/instructions.svg'
import { ReactComponent as FunnelNotesSVG } from '../../../../../assets/FunnelNotes.svg'


export default class FunnelNotesRightPanel extends React.Component {

  state = {
    showNotes: false,
  }

  showNotes = () => this.setState({
    showNotes: true,
    showMenu: false,
    funnelNotes: this.props.work.diagram && this.props.work.diagram.funnelNotes,
  })
  hideNotes = () => this.setState({ showNotes: false })

  handleChange = e => this.setState({
    [e.target.name]: e.target.value
  });

  saveDiagramHandle = file => this.setState({
    snackMsg: 'next',
    converted: this.props.app.serialization(this.props.app.getDiagramEngine().getDiagramModel())
  }, () => {
    this.props.work.saveDiagram(this.props.work.funnelId, this.state, file)
  });

  render() {
    return (
      <>


        {this.props.work.pathname.includes('diagram') ?
          <>
            <button
              className="diagram-header-menu-button"
              onClick={this.showNotes}
              style={{ background: this.state.showNotes ? '#ecf1f2' : '#fff' }}
              title={'Funnel Notes'}
            >
              <FunnelNotesSVG />
            </button>
          </>
          :
          null
        }




        <ModalNodeWidget
          show={this.state.showNotes}
          handleClose={this.hideNotes}
          style={{
            position: 'absolute',
            top: 65,
          }}
        >
          <label className='label-create-widget-settings'>Funnel Notes</label>
          <div style={{
            padding: 15,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <label htmlFor="FunnelNotes" className='label-input'>
              Funnel Notes
                </label>
            <textarea
              id="FunnelNotes"
              placeholder="Funnel Notes"
              type="text"
              value={this.state.funnelNotes}
              onChange={this.handleChange}
              name='funnelNotes'
              rows="30"
              style={{
                margin: 10
              }}
            />
            {this.props.work.message && (
              <div className={`input-group`}>{this.props.work.message}</div>
            )}
            <button
              className='btn btn-1 create-project-button-in-modal'
              style={{ display: 'block' }}
              onClick={() => {
                let diagram = document.getElementById('diagram-layer');
                domtoimage.toBlob(diagram)
                  .then(data => {
                    let name = randomString({ length: 10 });
                    var file = new File([data], name, { type: "image/svg" });
                    this.saveDiagramHandle(file);
                  })
                  .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                  });
              }}
            >
              Save
                </button>
          </div>
        </ModalNodeWidget>
      </>
    );
  }
}