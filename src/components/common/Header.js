import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import './header.css'
import { createProject } from '../../store/actions/projects'
import { signOutUser } from '../../store/actions/auth'
import Modal from './Modal/Modal'
import Cookies from "js-cookie";
import { API_URL } from '../../config'
import ClickOutside from '../common/ClickOutside'

class Header extends Component {
  state = {
    show: false,
    showSignOut: false,
    projectName: ''
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showModalSignOut = () => {
    this.setState({
      showSignOut: true,
      show: false
    });
  };

  hideModalSignOut = () => {
    this.setState({ showSignOut: false });
  };

  handleChange = e => this.setState({
    projectName: e.target.value
  });

  handleCreateProject = () => {
    this.props.createProject(this.state.projectName)
    this.props.error && this.props.error.length > 0 && this.hideModal()
  }


  render() {
    const userAvatar = Cookies.get("userAvatar");
    const userFirstName = Cookies.get("userFirstName");
    return (
      <>
        <header>
          <div className="logo">{this.props.title}</div>
          <nav>
            {
              this.props.authenticated ?
                <div className='header-buttons'>
                  <button className='btn btn-1 btn-show-modal-create' onClick={this.showModal}>Create Project</button>

                  <div className='header-img-preview' onClick={this.showModalSignOut}>
                    {userAvatar === API_URL ? <div className="header-preview-empty">{userFirstName[0] && userFirstName[0].toUpperCase()}</div> : <img src={userAvatar} alt='Avatar' />}
                  </div>
                </div>
                :
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

        <ClickOutside
          onClickOutside={() => {
            this.setState({ showSignOut: false })
          }}
        >
          <Select show={this.state.showSignOut}>
            <p style={{ fontSize: '13px' }} className='header-select-label'>You are currently on a free subscription!</p>
            <button className='btn-select btn-select-delete' onClick={() => this.props.signOutUser()}>Log Out</button>
          </Select>
        </ClickOutside>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    error: state.projects.createProjectError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: projectName => dispatch(createProject(projectName)),
    signOutUser: () => dispatch(signOutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

//modalka, fuck yeah
const Select = ({ show, children }) => {
  const showHideClassName = show ? "header-select header-display-block" : "header-select header-display-none";

  return (
    <div className={showHideClassName}>
      <section className="header-select-main">
        {children}
      </section>
    </div>
  );
};
