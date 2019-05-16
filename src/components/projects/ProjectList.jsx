import React from 'react'
// import { getCurrentUser, getAllUsers } from '../../actions/users'
// import { getAllPosts } from '../../actions/posts'
import Layout from "../common/Layout";
import { connect } from 'react-redux'
import './ProjectList.css'
import { getAllProjectByUserId, deleteProjectByUserId } from '../../actions/projects'

class ProjectList extends React.Component {
  componentDidMount() {
    this.props.getAllProjectByUserId();
    // this.forceUpdate();
  }

  handleDelete = id => {
    this.props.deleteProjectByUserId(id)
    // this.forceUpdate()
    // setInterval(() => this.forceUpdate(), 10);
  }

  renderProjects() {
    console.log(this.props.projectsList)
    const projects = this.props.projectsList || [];

    return projects.map((project, index) => {
      return <div key={index}>
        <div className='project-wrapper'>
          {project.projectName}
          <button style={{ float: 'right' }} onClick={() => this.handleDelete(project._id)}>delete</button>
        </div>
      </div>
    })
  }

  render() {
    return (
      <Layout title="Project List">
        <div className='projects-wrapper'>
          {this.renderProjects()}
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { projectsList: state.projects.projectsList };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProjectByUserId: () => dispatch(getAllProjectByUserId()),
    deleteProjectByUserId: id => dispatch(deleteProjectByUserId(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);