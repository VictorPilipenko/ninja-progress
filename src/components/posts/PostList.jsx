import React, { Component } from 'react'
import { getCurrentUser, getAllUsers } from '../../actions/users'
import { getAllPosts } from '../../actions/posts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Feature extends Component {
  componentDidMount() {
    this.props.getAllPosts();
    this.props.getCurrentUser();
    this.props.getAllUsers();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.forceUpdate();
  }

  renderPost() {
    const posts = this.props.posts || [];

    return posts.map((post, i) => {
      return <li key={i}>title:{post.title}  body:{post.body} author: {this.getUserNameBy_PostUserId(post.user_id)}</li>
    })
  }

  getUserNameBy_PostUserId(user_id) {
    const users = this.props.users || [];

    // return users.map((user, i) => {
    //   if(user.id === user_id){
    //     return <p key={i}>{ user.name }</p>

        return users.filter(user => {
          return user.id.includes(user_id);
            
      });
      

      //}
    //})
  }

  render() {
    return (
      <div className="content users">
        <h1>Hello, {this.currentUser ? this.currentUser.name : null }</h1>
        <p>Here are all auth protected users posts! :)</p>
        <ul>
          {this.renderPost()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.post.list };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCurrentUser,
    getAllPosts,
    getAllUsers
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Feature);