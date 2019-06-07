import React, { Component } from 'react';
import { connect } from 'react-redux';
import FunnelItem from './FunnelItem.jsx';
import { deleteTemplate, createNewProjectWithTemplate } from '../../store/actions/projects'

class FunnelItemContainer extends Component {

  handleDelete = (funnelId) => {
    this.props.deleteTemplate(funnelId)
  }

  createNewProjectWithTemplate = (id, projectName) => {
    this.props.createNewProjectWithTemplate(id, projectName)
  }

  render() {
    const { _id, funnelName, projectId, funnelBody } = this.props;
    // console.log(this.props)
    return (
      <FunnelItem
        _id={_id}
        funnelName={funnelName}
        funnelBody={funnelBody}
        projectId={projectId}
        handleDelete={this.handleDelete}
        createNewProjectWithTemplate={this.createNewProjectWithTemplate}
        messageCreateProject={this.props.messageCreateProject}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    messageCreateProject: state.projects.createNewProjectWithTemplateMessage,
  };
}


const mapDispatchToState = dispatch => ({
  deleteTemplate: (funnelId) => dispatch(deleteTemplate(funnelId)),
  createNewProjectWithTemplate: (id, name) => dispatch(createNewProjectWithTemplate(id, name)),
});

export default connect(mapStateToProps, mapDispatchToState)(FunnelItemContainer);
