import * as React from "react";
import BodyWidget from "./Components/BodyWidget";
import Application from "./Application";
import "./index.css";
import "storm-react-diagrams/dist/style.min.css";
import { connect } from 'react-redux'
import { saveDiagram, getTemplate, sendImageToCollaborate, resetSendImageToCollaborateLink } from '../../../store/actions/projects'
import { getDiagram } from '../../../store/actions/projects'
import { createTemplate, saveTemplate } from '../../../store/actions/projects'
import { getSVG } from '../../../store/actions/projects'


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
      if (prevProps.diagram.funnelBody.snackMsg !== this.state.snackMsg) {
        this.props.getDiagram(this.props.funnelId);
        this.props.getTemplate(this.props.funnelId);
      }
    }
    else return null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("getDerivedStateFromProps nextProps: ", nextProps, "\ngetDerivedStateFromProps prevState: ", prevState)
    if (nextProps.diagram)
      if (nextProps.diagram.funnelBody.snackMsg !== prevState.snackMsg)
        return {
          diagram: nextProps.diagram.funnelBody.converted,
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
  // console.log('state:', state)
  return {
    diagram: state.projects[`diagram${ownProps.match.params.funnelId}`],
    svg: state.projects.svgList,
    funnelId: ownProps.match.params.funnelId,
    message: state.projects.saveDiagramMessage,
    createTemplateMessage: state.projects.createTemplateMessage,
    link: state.projects.sendImageToCollaborateLink,
    pathname: state.router.location.pathname,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getSVG: () => dispatch(getSVG()),
    saveDiagram: (funnelId, obj) => dispatch(saveDiagram(funnelId, obj)),
    saveTemplate: (funnelId, obj) => dispatch(saveTemplate(funnelId, obj)),
    getDiagram: id => dispatch(getDiagram(id)),
    getTemplate: id => dispatch(getTemplate(id)),
    createTemplate: (id, name) => dispatch(createTemplate(id, name)),
    sendImageToCollaborate: (id, data) => dispatch(sendImageToCollaborate(id, data)),
    resetSendImageToCollaborateLink: () => dispatch(resetSendImageToCollaborateLink()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);