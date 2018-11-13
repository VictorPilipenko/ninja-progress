import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <header>
        <NavLink to={this.props.authenticated ? '/info' : '/'} className="logo">Homework</NavLink>
          <nav>
            {
              this.props.authenticated ?
                <ul>
                  <li>
                    <NavLink to="/create-post">Create post</NavLink>
                  </li>
                  <li>
                    <NavLink to="/posts">Posts</NavLink>
                  </li>

                  <li>
                    <NavLink to="/users">Users</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signout">Sign out</NavLink>
                  </li> 
                </ul>
                :
                <ul>
                  <li>
                    <NavLink to="/signin">Sign in</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup">Sign up</NavLink>
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