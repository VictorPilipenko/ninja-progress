import * as React from "react";
import BodyWidget from "./Components/BodyWidget";
import Application from "./Application";
import "./index.css";
import "storm-react-diagrams/dist/style.min.css";
import { connect } from 'react-redux'
import { saveDiagram, getTemplate, sendImageToCollaborate, resetSendImageToCollaborateLink } from '../../../store/actions/projects'
import { getDiagram } from '../../../store/actions/projects'
import { saveTemplate } from '../../../store/actions/projects'


class App extends React.Component {

  componentDidMount() {
    this.props.getDiagram(this.props.funnelId);
    this.props.getTemplate(this.props.funnelId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.diagram) {
      if (prevProps.diagram.funnelBody.snackMsg !== this.state.snackMsg) {
        this.props.getDiagram(this.props.funnelId);
        this.props.getTemplate(this.props.funnelId);
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps nextProps: ", nextProps, "\ngetDerivedStateFromProps prevState: ", prevState)
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
      return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      snackMsg: 'prev',
    };
  }

  render() {
    var app = new Application(this.state.diagram && this.state.diagram);

    return (
      <BodyWidget app={app} work={this.props} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    diagram: state.projects[`diagram${ownProps.match.params.funnelId}`],
    funnelId: ownProps.match.params.funnelId,
    message: state.projects.saveDiagramMessage,
    saveTemplateMessage: state.projects.saveTemplateMessage,
    link: state.projects.sendImageToCollaborateLink
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveDiagram: (funnelId, obj) => dispatch(saveDiagram(funnelId, obj)),
    getDiagram: id => dispatch(getDiagram(id)),
    getTemplate: id => dispatch(getTemplate(id)),
    saveTemplate: (id, name) => dispatch(saveTemplate(id, name)),
    sendImageToCollaborate: (id, data) => dispatch(sendImageToCollaborate(id, data)),
    resetSendImageToCollaborateLink: () => dispatch(resetSendImageToCollaborateLink()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);