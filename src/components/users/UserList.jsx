import React, { Component } from 'react'
import * as actions from '../../actions/users'
import { connect } from 'react-redux'

class Feature extends Component {
  componentDidMount() {
    this.props.getAllUsers();
    this.props.getCurrentUser();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.forceUpdate();
  }

  renderUsers() {
    const users = this.props.users || [];
    console.log(this.props);

    return users.map((user, i) => {
      return <li key={i}>{ user.name }</li>
    })
  }

  render() {
    return (
      <div className="content users">
        <h1>Hello, { this.currentUser ? this.currentUser.name : null }</h1>
        <p>Here are all auth protected users names! :)</p>
        <ul>
          { this.renderUsers() }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    users: state.user.list,
    
  };
}

export default connect(mapStateToProps, actions)(Feature);