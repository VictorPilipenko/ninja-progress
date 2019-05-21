import React from 'react'
import Layout from "../common/Layout";
import { connect } from 'react-redux'
import './ProjectList.css'
import { getAllProjects } from '../../store/actions/projects'
import ProjectItemContainer from './ProjectItemContainer.jsx'

class ProjectList extends React.Component {
  componentDidMount() {
    this.props.getAllProjects();
  }

  render() {
    return (
      <Layout title="Project List">
        <div className='projects-wrapper'>
          {
            this.props.projects && this.props.projects.map((project, index) => (
              <ProjectItemContainer
                key={index}
                _id={project._id}
                projectName={project.projectName}
                funnels={project.projectFunnels}
              />
            ))
          }
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  console.log('state ',state)
  // console.log('state.projects.projectsList ',state.projects.projectsList)
  return {
    projects: state.projects.projectsList
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProjects: () => dispatch(getAllProjects()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);