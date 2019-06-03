import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import './header.css'
import { createProject, createFunnel } from '../../store/actions/projects'
import { signOutUser } from '../../store/actions/auth'
import Modal from './Modal/Modal'
import Cookies from "js-cookie";
import { API_URL } from '../../config'
import ClickOutside from '../common/ClickOutside'

import { ReactComponent as RingSVG } from '../../assets/ring.svg'
import { ReactComponent as SearchSVG } from '../../assets/search.svg';
import { ReactComponent as QuestionSVG } from '../../assets/question-mark.svg';

class Header extends Component {
  state = {
    show: false,
    showFunnel: false,
    showSignOut: false,
    projectName: '',
    funnelName: '',
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showModalFunnel = () => {
    this.setState({ showFunnel: true });
  };

  hideModalFunnel = () => {
    this.setState({ showFunnel: false });
  };

  showModalSignOut = () => {
    this.setState({
      showSignOut: true,
      show: false,
      showFunnel: false,
    });
  };

  hideModalSignOut = () => {
    this.setState({ showSignOut: false });
  };

  handleChange = e => this.setState({
    [e.target.name]: e.target.value
  });

  handleCreateProject = () => {
    this.props.createProject(this.state.projectName)

    setTimeout(() => {
      !this.props.error && this.hideModal()
    }, 1000)
  }

  handleCreateFunnel = () => {
    this.props.createFunnel(this.state.funnelName, this.props.projectId)

    setTimeout(() => {
      !this.props.errorFunnel && this.hideModalFunnel()
    }, 1000)
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

                  <div style={{ marginLeft: 15, marginRight: 15, display: 'flex' }}>
                    <SearchSVG />
                  </div>

                  {this.props.pathname.includes('funnels') ?
                    <button className='btn btn-1 btn-show-modal-create' onClick={this.showModalFunnel}>Create Funnel</button>
                    :
                    <button className='btn btn-1 btn-show-modal-create' onClick={this.showModal}>Create Project</button>
                  }

                  <div style={{ marginLeft: 15, marginRight: 5, display: 'flex'}}>
                    <QuestionSVG />
                  </div>

                  <div style={{ marginLeft: 5, marginRight: 15, display: 'flex' }}>
                    <RingSVG />
                  </div>

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

          <label htmlFor="NameProject" className='label-input'>
            Name
          </label>
          <input
            id="NameProject"
            placeholder="Project Name"
            type="text"
            name='projectName'
            value={this.state.projectName}
            onChange={this.handleChange}
          />
          {this.props.error && this.props.error.length > 0 && (
            <div className={`input-group`}>{this.props.error}</div>
          )}

          <button className='btn btn-1 create-project-button-in-modal' onClick={() => this.handleCreateProject()}>Create Project</button>
        </Modal>

        <Modal show={this.state.showFunnel} handleClose={this.hideModalFunnel}>
          <label className='label-create'>Create Funnel</label>

          <label htmlFor="NameFunnel" className='label-input'>
            Name
          </label>
          <input
            id="NameFunnel"
            placeholder="Funnel Name"
            type="text"
            name='funnelName'
            value={this.state.funnelName}
            onChange={this.handleChange}
          />
          {this.props.errorFunnel && this.props.errorFunnel.length > 0 && (
            <div className={`input-group`}>{this.props.errorFunnel}</div>
          )}

          <button className='btn btn-1 create-project-button-in-modal' onClick={() => this.handleCreateFunnel()}>Create Funnel</button>
        </Modal>

        <ClickOutside
          onClickOutside={() => {
            this.setState({ showSignOut: false })
          }}
        >
          <Select show={this.state.showSignOut}>
            <p style={{
              fontSize: '13px',
              textAlign: 'left',
              paddingLeft: '11px',
              background: '#f6f8f9',
              margin: '0',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
              className='header-select-label'>You are currently on a free subscription!<br /><span style={{ color: '#fd8f21' }}>Upgrade</span></p>
            <p className='text-settings-payment' style={{
              display: 'flex',
              paddingLeft: '15px',
              marginBottom: '10px',
              borderTop: '1px solid rgb(220, 229, 236)',
              paddingTop: '15px',
            }}
            ><span style={{ color: '#fd8f21', marginRight: 8 }}>✓</span>Funnelsmap UI/UX design</p>
            <p className='text-settings-payment' style={{ display: 'flex', marginLeft: 15 }}><li style={{ color: '#ea4e9d' }}></li>MOSKALOW</p>
            <p className='text-settings-payment' style={{ display: 'flex', marginLeft: 15, marginBottom: 25, marginTop: 10 }}><li style={{ color: '#4186e0' }}></li>TRIOLUX</p>

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
    errorFunnel: state.projects.createFunnelError,
    projectId: state.router.location.pathname.substring(9),// get projectId from pathname
    pathname: state.router.location.pathname,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: projectName => dispatch(createProject(projectName)),
    createFunnel: (funnelName, id) => dispatch(createFunnel(funnelName, id)),
    signOutUser: () => dispatch(signOutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

//fuck yeah
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
