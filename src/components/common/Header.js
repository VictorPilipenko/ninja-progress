import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import './header.css'
import { createProject } from '../../store/actions/projects'
import { signoutUser } from '../../store/actions/auth'


class Header extends Component {
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
    this.hideModal()
  }


  render() {
    // console.log('this.props.authenticated',this.props.authenticated)
    return (
      <>
        <header>
          <div className="logo">{this.props.title}</div>
          <nav>
            {
              this.props.authenticated ?
                <div className='header-buttons'>
                  {/*
                  <li>
                    <NavLink to="/create-project">Create project</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Dashboard</NavLink>
                  </li>
                */}

                  <button className='btn btn-1 btn-show-modal-create' onClick={this.showModal}>Create Project</button>

                  <button className='btn btn-1 btn-sign-out' onClick={() => this.props.signoutUser()}>Sign Out</button>

                </div>
                :
                // <ul>
                //   <li>
                //     <NavLink to="/sign-in">Sign in</NavLink>
                //   </li>
                //   <li>
                //     <NavLink to="/sign-up">Sign up</NavLink>
                //   </li>
                // </ul>
                null
            }
          </nav>
        </header>

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
      </>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    authenticated: state.auth.authenticated,
    error: state.projects.createProjectError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: projectName => dispatch(createProject(projectName)),
    signoutUser: () => dispatch(signoutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


//modalka, fuck yeah
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button className="close-modal" onClick={handleClose}>X</button>
        {children}
      </section>
    </div>
  );
};