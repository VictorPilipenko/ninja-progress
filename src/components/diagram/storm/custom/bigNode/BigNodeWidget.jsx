import * as React from "react";
import { PortWidget } from "storm-react-diagrams";
import ReactSVG from "react-svg";
import { connect } from "react-redux";
import ClickOutside from "../../../../common/ClickOutside";
import { ReactComponent as CopySVG } from "../../../../../assets/selectForWidget/copy.svg";
import { ReactComponent as DeleteAllLinksSVG } from "../../../../../assets/selectForWidget/delete-all-links.svg";
import { ReactComponent as DeleteSVG } from "../../../../../assets/selectForWidget/delete.svg";
import { ReactComponent as NotesSVG } from "../../../../../assets/selectForWidget/notes.svg";
import { ReactComponent as SettingsSVG } from "../../../../../assets/selectForWidget/settings.svg";
import {
  saveDiagramThenShowOrHideSettingsModal,
  saveDiagramThenShowOrHideNotesModal
} from "../../../../../store/actions/projects";
import { cloneSelected, deleteNode, deleteAllLinks, showRightModal } from "../funcsForCustomNodeWidget";
import './index.css'

const Select = ({ show, children }) => {
  const showHideClassName = show
    ? "select-modal-node-widget display-block"
    : "select-modal-node-widget display-none";
  return (
    <div className={showHideClassName}>
      <section className="select-main-modal-node-widget up-arrow">
        {children}
      </section>
    </div>
  );
};

const SelectAnalytics = ({ show, children }) => {
  const showHideClassName = show
    ? "select-modal-node-widget display-block"
    : "select-modal-node-widget display-none";
  return (
    <div className={showHideClassName}>
      <section className="select-analytics-widget up-arrow-analytics">
        {children}
      </section>
    </div>
  );
};

class BigNodeWidget extends React.Component {
  state = {
    show: false,
    handleGridTwo: false,
  };

  showModal = () => {
    this.setState({ 
      show: true, 
      handleGrid: this.props.diagram && this.props.diagram.handleGrid 
    });
  }
    
  hideModal = () => {
    this.setState({ 
      show: false, 
      handleGridTwo: false 
    });
  };

  mouseMove = () => {
    this.state.handleGrid && this.setState({ handleGridTwo: true })
  }

  render() {
    // console.log(this.props.node.extras.goald)
    // console.log(this.props.node.extras.triggerd)
    //  console.log('big', this.props.node.extras)
    return (
      <>
        <div
          className='big-node-title'
        >
          {this.props.node.extras.named
            ? this.props.node.extras.named
            : this.props.node.type}
        </div>

        <div
          style={{
            position: "relative",
            height: 122,
            width: 92,
            borderRadius: 7,
            zIndex: 10,
          }}
          onMouseEnter={this.showModal}
          onMouseLeave={this.hideModal}
          title={
            this.props.node.extras.named
              ? this.props.node.extras.named
              : this.props.node.type
          }
        >
          {
            this.state.handleGridTwo ?
            <>
              <div className='left-line' />
              <div className='right-line' />
              <div className='top-line' />
              <div className='bottom-line' />
            </> : null
          }

          <div
            className="big-area-for-hover"
            onMouseEnter={this.showModal}
            onMouseLeave={this.hideModal}
            onMouseMove={this.mouseMove}
          />

          <ClickOutside
            onClickOutside={() => {
              this.setState({ show: false });
            }}
            onMouseEnter={this.showModal}
            onMouseLeave={this.hideModal}
          >
            {
              this.props.showAnalyticsBoolean ?
                <SelectAnalytics show={true}>
                  <>
                    <div 
                      className='analytics-box' 
                      title={'394/18%'}
                    >
                      <p className='top-anal'>Clicks:</p>
                      <p className='bottom-anal'>394/18%</p>
                    </div>
                    <div 
                      className='analytics-box'
                      title={'987'}
                    >
                      <p className='top-anal'>Active on page:</p>
                      <p className='bottom-anal'>987</p>
                    </div>
                    <div 
                      className='analytics-box'
                      title={'644/22%'}
                    >
                      <p className='top-anal'>Conversion:</p>
                      <p className='bottom-anal'>644/22%</p>
                    </div>
                  </>
                </SelectAnalytics>
                :
                <Select show={this.state.show}>
                  <button
                    className="btn-select-widget"
                    onClick={() => showRightModal(
                      this.props.saveDiagramThenShowOrHideSettingsModal,
                      this.props.funnelId,
                      this.props.engine,
                      this.props.node,
                      'big'
                    )}
                    title={"Settings"}
                  >
                    <SettingsSVG />
                  </button>
                  <button
                    className="btn-select-widget"
                    onClick={() => showRightModal(
                      this.props.saveDiagramThenShowOrHideNotesModal,
                      this.props.funnelId,
                      this.props.engine,
                      this.props.node,
                    )}
                    title={"Notes"}
                  >
                    <NotesSVG />
                  </button>
                  <button
                    className="btn-select-widget"
                    onClick={() => cloneSelected(
                      this.props.engine,
                      this.props.saveDiagramThenShowOrHideSettingsModal,
                      this.props.funnelId,
                      this.props.node,
                    )}
                    title={"Copy"}
                  >
                    <CopySVG />
                  </button>
                  <button
                    className="btn-select-widget"
                    onClick={deleteNode}
                    title={"Delete"}
                  >
                    <DeleteSVG />
                  </button>
                  <button
                    className="btn-select-widget"
                    onClick={() => deleteAllLinks(
                      this.props.engine
                    )}
                    title={"Delete All Links"}
                  >
                    <DeleteAllLinksSVG />
                  </button>
                </Select>
            }
            
          </ClickOutside>

          <ReactSVG
            src={this.props.svg}
            beforeInjection={svg => {
              svg.setAttribute(
                'style', 
                `box-shadow: 0 0 28px ${
                  this.props.node.extras.goald ? '#fd8f21' : null 
                  ||
                  this.props.node.extras.triggerd ? '#5ab5ff' : null
                }`
              )
            }}
          />

          <div
            style={{
              position: "absolute",
              zIndex: 10,
              top: 55,
              left: -13
            }}
          >
            <PortWidget name="left" node={this.props.node} />
          </div>

          <div
            style={{
              position: "absolute",
              zIndex: 10,
              top: -13,
              left: 38
            }}
          >
            <PortWidget name="top" node={this.props.node} />
          </div>

          <div
            style={{
              position: "absolute",
              zIndex: 10,
              top: 55,
              left: 90
            }}
          >
            <PortWidget name="right" node={this.props.node} />
          </div>

          <div
            style={{
              position: "absolute",
              zIndex: 10,
              top: 119,
              left: 38
            }}
          >
            <PortWidget name="bottom" node={this.props.node} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    diagram: state.projects[`diagram${state.router.location.pathname.substring(9)}`],

    showSettingsWidgetBoolean: state.projects.showSettingsWidgetBoolean,
    showSettingsWidgetModel: state.projects.showSettingsWidgetModel,

    showNotesWidgetBoolean: state.projects.showNotesWidgetBoolean,
    showNotesWidgetModel: state.projects.showNotesWidgetModel,

    funnelId: state.router.location.pathname.substring(9),
    svgList: state.projects.svgList,

    showAnalyticsBoolean: state.projects.showAnalyticsBoolean
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveDiagramThenShowOrHideSettingsModal: (
      id,
      state,
      file,
      boolean,
      model,
      engine,
      typeOfNode,
    ) =>
      dispatch(
        saveDiagramThenShowOrHideSettingsModal(
          id,
          state,
          file,
          boolean,
          model,
          engine,
          typeOfNode,
        )
      ),

    saveDiagramThenShowOrHideNotesModal: (
      id,
      state,
      file,
      boolean,
      model,
      engine
    ) =>
      dispatch(
        saveDiagramThenShowOrHideNotesModal(
          id,
          state,
          file,
          boolean,
          model,
          engine
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BigNodeWidget);
