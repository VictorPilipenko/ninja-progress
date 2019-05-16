import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './header.css'
import { createProject } from '../../actions/projects'


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


  render() {
    // console.log('this.props.authenticated',this.props.authenticated)
    return (
      <header>
        <div className="logo">{this.props.title}</div>
        <nav>
          {
            this.props.authenticated ?
              <ul>
                {/*
                  <li>
                    <NavLink to="/create-project">Create project</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Dashboard</NavLink>
                  </li>
                */}
                <Modal show={this.state.show} handleClose={this.hideModal}>
                  {/* <div className='label'>Create Project</div> */}
          
                  {/* <div className='create-project-input'> */}
                    <label htmlFor="Name" className='label'>
                      Name
                    </label>
                    <input
                      id="Name"
                      placeholder="Enter your project name"
                      type="text"
                      value={this.state.projectName}
                      onChange={this.handleChange}
                    />
                    <button className='create-project-button-in-modal' onClick={() => this.props.createProject(this.state.projectName)}>Create Project</button>
                  {/* </div> */}
                </Modal>
                <button onClick={this.showModal}>Create Project</button>
                <li>
                  <NavLink to="/sign-out">Sign out</NavLink>
                </li>
              </ul>
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
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: projectName => dispatch(createProject(projectName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


//modalka, fuck yeah
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button className="close-modal" onClick={handleClose}>close</button>
        {children}
      </section>
    </div>
  );
};