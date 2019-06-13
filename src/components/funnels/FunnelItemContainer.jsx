import React, { Component } from 'react';
import { connect } from 'react-redux';
import FunnelItem from './FunnelItem.jsx';
import { deleteFunnel } from '../../store/actions/projects'

class FunnelItemContainer extends Component {
  handleDelete = (projectId, funnelId) => {
    this.props.deleteFunnel(projectId, funnelId)
  }

  render() {
    const { _id, funnelName, projectId, funnelBody, backgroundImg } = this.props;
    return (
      <FunnelItem
        _id={_id}
        funnelName={funnelName}
        funnelBody={funnelBody}
        projectId={projectId}
        handleDelete={this.handleDelete}
        backgroundImg={backgroundImg}
      />
    );
  }
}

const mapDispatchToState = dispatch => ({
  deleteFunnel: (projectId, funnelId) => dispatch(deleteFunnel(projectId, funnelId)),
});

export default connect(null, mapDispatchToState)(FunnelItemContainer);
