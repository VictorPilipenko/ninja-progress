import * as React from "react";

import BodyWidget from "./Components/BodyWidget";
import Application from "./Application";

import "./index.css";
import "storm-react-diagrams/dist/style.min.css";

import { connect } from 'react-redux'
import { saveDiagram } from '../../../store/actions/projects'
import { getDiagram } from '../../../store/actions/projects'

import { parse } from 'flatted/esm';


class App extends React.Component {

  componentDidMount() {
    this.props.getDiagram(this.props.funnelId);
    console.log('componentDidMount this.props: ', this.props)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.diagram) {
      console.log('componentDidUpdate prevProps: ', prevProps)
      console.log('componentDidUpdate this.state: ', this.state)
      if (prevProps.snackMsg !== this.state.snackMsg) {
        this.props.getDiagram(this.props.funnelId);
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps nextProps: ", nextProps, "\ngetDerivedStateFromProps prevState: ", prevState)
    if (nextProps.diagram)
      if (nextProps.diagram.snackMsg !== prevState.snackMsg)
        return {
          diagram: parse(nextProps.diagram.converted),
          snackMsg: 'next',
        };
      else
        return null;
    else
      return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      snackMsg: 'prev'
    };
  }
  render() {

    console.log(this.state && this.state)

    var app = new Application(this.state.diagram && this.state.diagram);

    return (
      <BodyWidget app={app} work={this.props} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  // console.log('diagram: ', state.projects[`diagram${ownProps.match.params.funnelId}`])

  return {
    diagram: state.projects[`diagram${ownProps.match.params.funnelId}`],
    funnelId: ownProps.match.params.funnelId,
    // error: state.projects.createFunnelError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveDiagram: (funnelId, obj) => dispatch(saveDiagram(funnelId, obj)),
    getDiagram: id => dispatch(getDiagram(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);