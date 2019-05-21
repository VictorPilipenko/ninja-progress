import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectItem from './ProjectItem.jsx';
import { deleteProjectByUserId, /*getAllFunnels*/ } from '../../store/actions/projects'

class ProjectItemContainer extends Component {

  // componentDidMount(){
  //   // this.props.getAllFunnels(this.props._id)
  // }

  handleDelete = id => {
    this.props.deleteProjectByUserId(id)
  }

  render() {
    const { _id, projectName, funnels } = this.props;
    // console.log(this.props.funnels.length)
    return (
      <ProjectItem
        _id={_id}
        projectName={projectName}
        funnelsLength={funnels && funnels.length}
        handleDelete={this.handleDelete}
      />
    );
  }
}

// function mapStateToProps(state, ownProps) {

//   // console.log('ownProps ',ownProps)
//   // console.log('state.projects.projectsList ',state.projects.projectsList)
//   return {
//     // funnels: state.projects[`funnelsList${ownProps._id}`],
//   };
// }

const mapDispatchToState = dispatch => ({
  deleteProjectByUserId: id => dispatch(deleteProjectByUserId(id)),
  // getAllFunnels: id => dispatch(getAllFunnels(id)),
});

export default connect(null, mapDispatchToState)(ProjectItemContainer);
