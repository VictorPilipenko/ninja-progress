import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './header.css'

class Header extends Component {
  render() {
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
                <li>
                  <NavLink to="/sign-out">Sign out</NavLink>
                </li>
              </ul>
              :
              <ul>
                <li>
                  <NavLink to="/sign-in">Sign in</NavLink>
                </li>
                <li>
                  <NavLink to="/sign-up">Sign up</NavLink>
                </li>
              </ul>
          }
        </nav>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);