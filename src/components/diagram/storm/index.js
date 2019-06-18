import * as React from "react";
import BodyWidget from "./Components/BodyWidget";
import Application from "./Application";
import "./index.css";
import "storm-react-diagrams/dist/style.min.css";
import { connect } from 'react-redux'
import { saveDiagram, getTemplate, sendImageToCollaborate, resetSendImageToCollaborateLink } from '../../../store/actions/projects'
import { getDiagram } from '../../../store/actions/projects'
import { createTemplate, saveTemplate } from '../../../store/actions/projects'
import { getSVG, saveDiagramThenCreateTemplate, changeFunnelName, saveDiagramThenExit } from '../../../store/actions/projects'


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
    // console.log('componentDidUpdate prevProps: ', prevProps)
    if (prevProps.diagram) {
      if (prevProps.diagram.snackMsg !== this.state.snackMsg) {
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
          diagram: null,
          snackMsg: 'prev',
        };
    else
      return null
  }


  render() {

    // console.log(this.state)

    var app = new Application(
      this.state.diagram && this.state.diagram,
      this.props.svg && this.props.svg,
      this.props.showSettingsWidget,
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
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getSVG: () => dispatch(getSVG()),
    saveDiagram: (funnelId, obj, image) => { dispatch(saveDiagram(funnelId, obj, image)) },
    saveTemplate: (funnelId, obj) => dispatch(saveTemplate(funnelId, obj)),
    getDiagram: id => dispatch(getDiagram(id)),
    getTemplate: id => dispatch(getTemplate(id)),
    createTemplate: (id, name) => dispatch(createTemplate(id, name)),
    sendImageToCollaborate: (id, data) => dispatch(sendImageToCollaborate(id, data)),
    resetSendImageToCollaborateLink: () => dispatch(resetSendImageToCollaborateLink()),
    saveDiagramThenCreateTemplate: (funnelId, diagramObj, image, templateName) => dispatch(saveDiagramThenCreateTemplate(funnelId, diagramObj, image, templateName)),
    changeFunnelName: (funnelId, name) => dispatch(changeFunnelName(funnelId, name)),
    saveDiagramThenExit: (funnelId, diagramObj, image) => dispatch(saveDiagramThenExit(funnelId, diagramObj, image)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);