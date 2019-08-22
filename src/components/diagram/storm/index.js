import * as React from "react";
import { connect } from 'react-redux'
import BodyWidget from "./Components/BodyWidget";
import Application from "./Application";
import "storm-react-diagrams/dist/style.min.css";
import "./index.css";
import {
  getDiagram,
  createTemplate, 
  saveTemplate,
  getSVG,
  saveDiagramThenCreateTemplate,
  changeFunnelName,
  saveDiagramThenExit,
  saveDiagramThenShowOrHideSettingsModal,
  saveDiagramThenShowOrHideNotesModal,
  saveDiagram, 
  getTemplate, 
  sendImageToCollaborate, 
  resetSendImageToCollaborateLink,
  showAnalyticsBoolean,
} from '../../../store/actions/projects'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackMsg: 'prev',
    };
  }

  componentDidMount() {
    this.props.getDiagram(this.props.funnelId);
    this.props.getTemplate(this.props.funnelId);
    this.props.getSVG();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.diagram) {
      if (prevProps.diagram.snackMsg !== this.state.snackMsg && prevProps.diagram.snackMsg !== undefined) {
        this.props.getDiagram(this.props.funnelId);
        this.props.getTemplate(this.props.funnelId);
      }

    }
    else return null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("getDerivedStateFromProps nextProps: ", nextProps, "\ngetDerivedStateFromProps prevState: ", prevState)
    if (nextProps.diagram)
      if (nextProps.diagram.snackMsg !== prevState.snackMsg)
        return {
          diagram: nextProps.diagram.converted,
          snackMsg: 'next',
        };
      else
        return {
          snackMsg: 'prev',
        };
    else
      return null
  }

  render() {
    var app = new Application(
      this.state.diagram && this.state.diagram,
      this.props.svg && this.props.svg,
    );

    return (
      <BodyWidget app={app} work={this.props} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  // console.log('state:', state.projects[`diagram${ownProps.match.params.funnelId}`])
  return {
    diagram: state.projects[`diagram${ownProps.match.params.funnelId}`],
    svg: state.projects.svgList,
    funnelId: ownProps.match.params.funnelId,
    message: state.projects.saveDiagramMessage,
    createTemplateMessage: state.projects.createTemplateMessage,
    link: state.projects.sendImageToCollaborateLink,
    pathname: state.router.location.pathname,
    changeFunnelNameMessage: state.projects.changeFunnelNameMessage,

    showSettingsWidgetBoolean: state.projects.showSettingsWidgetBoolean,
    showSettingsWidgetModel: state.projects.showSettingsWidgetModel,
    showSettingsWidgetEngine: state.projects.showSettingsWidgetEngine,

    showNotesWidgetBoolean: state.projects.showNotesWidgetBoolean,
    showNotesWidgetModel: state.projects.showNotesWidgetModel,
    showNotesWidgetEngine: state.projects.showNotesWidgetEngine,
    showTypeOfNode: state.projects.showTypeOfNode,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getSVG: () => dispatch(getSVG()),
    saveDiagram: (funnelId, obj, image) => dispatch(saveDiagram(funnelId, obj, image)),
    saveTemplate: (funnelId, obj) => dispatch(saveTemplate(funnelId, obj)),
    getDiagram: id => dispatch(getDiagram(id)),
    getTemplate: id => dispatch(getTemplate(id)),
    createTemplate: (id, name) => dispatch(createTemplate(id, name)),
    sendImageToCollaborate: (id, data) => dispatch(sendImageToCollaborate(id, data)),
    resetSendImageToCollaborateLink: () => dispatch(resetSendImageToCollaborateLink()),
    saveDiagramThenCreateTemplate: (funnelId, diagramObj, image, templateName) => dispatch(saveDiagramThenCreateTemplate(funnelId, diagramObj, image, templateName)),
    changeFunnelName: (funnelId, name) => dispatch(changeFunnelName(funnelId, name)),
    saveDiagramThenExit: (funnelId, diagramObj, image) => dispatch(saveDiagramThenExit(funnelId, diagramObj, image)),


    saveDiagramThenShowOrHideSettingsModal: (id, state, file, boolean, model, engine) =>
      dispatch(saveDiagramThenShowOrHideSettingsModal(id, state, file, boolean, model, engine)),

    saveDiagramThenShowOrHideNotesModal: (id, state, file, boolean, model, engine) =>
      dispatch(saveDiagramThenShowOrHideNotesModal(id, state, file, boolean, model, engine)),

    showAnalyticsBoolean: boolean => dispatch(showAnalyticsBoolean(boolean)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);