import React from 'react'
import Layout from "../common/Layout";
import { connect } from 'react-redux'
import './ProjectList.css'
import { getAllProjects } from '../../store/actions/projects'
import ProjectItemContainer from './ProjectItemContainer.jsx'
import { createProject } from '../../store/actions/projects'
import Modal from '../common/Modal/Modal'
import { ReactComponent as CreateProjectSVG } from '../../assets/new_project.svg';

class ProjectList extends React.Component {
  componentDidMount() {
    // console.log('componentDidMount getAllProject')
    this.props.getAllProjects();
  }

  state = {
    show: false,
    projectName: ''
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleChange = e => this.setState({
    projectName: e.target.value
  });

  handleCreateProject = () => {
    this.props.createProject(this.state.projectName)

    setTimeout(() => {
      !this.props.error && this.hideModal()
    }, 1500)
  }

  even = n => !(n % 2);

  render() {
    return (
      <Layout title="Project List">
        {
          this.props.projectsLimit ?
            <>
              <div className='project-list-limit'>
                Created {this.props.projects && this.props.projects.length}
                {' '}
                {this.props.projects && this.props.projects.length > 1 || this.props.projects.length === 0 ? 'projects' : 'project'}
                {' '}
                of {this.props.projectsLimit}
              </div>
              <div className='project-list-limit'
                style={{
                  borderBottom: '1px solid #dce5ec',
                  top: 100,
                  right: 20,
                  left: 20,
                }} />
            </>
            : null
        }

        <div className='projects-wrapper' style={this.props.projectsLimit ? { marginTop: 110 } : { marginTop: 70 }}>
          {
            this.props.projects && this.props.projects.length > 0 ?
              this.props.projects.map((project, index) => (
                <ProjectItemContainer
                  key={index}
                  _id={project._id}
                  projectName={project.projectName}
                  funnelsLength={project.projectFunnels && project.projectFunnels.length}
                />
              ))
              :
              <div className='create-funnels' style={{ display: 'flex' }}>
                <CreateProjectSVG />
                <div style={{ alignSelf: 'center', width: 'max-content' }}>
                  <p style={{ fontSize: '25px', marginBottom: '-15px' }}>Create your first project
                    <br />
                    <span style={{ fontSize: '14px' }}>Start bringing your ideas to life</span>
                  </p>
                  <button className="btn btn-1" style={{ width: '125px', marginTop: '25px' }} onClick={this.showModal}>Create Project</button>
                </div>
              </div>
          }
        </div>

        <Modal show={this.state.show} handleClose={this.hideModal}>
          <label className='label-create'>Create Project</label>

          <label htmlFor="Name" className='label-input'>
            Name
          </label>
          <input
            id="Name"
            placeholder="Project Name"
            type="text"
            value={this.state.projectName}
            onChange={this.handleChange}
          />
          {this.props.error && this.props.error.length > 0 && (
            <div className={`input-group`}>{this.props.error}</div>
          )}
          <button className='btn btn-1 create-project-button-in-modal' onClick={() => this.handleCreateProject()}>Create Project</button>
        </Modal>

      </Layout >
    )
  }
}

function mapStateToProps(state) {
  // console.log(state.projects.projectsListLimit)
  return {
    projects: state.projects.projectsList,
    projectsLimit: state.projects.projectsListLimit,
    error: state.projects.createProjectError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProjects: () => dispatch(getAllProjects()),
    createProject: projectName => dispatch(createProject(projectName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
