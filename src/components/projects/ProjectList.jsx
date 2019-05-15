import React, { Component } from 'react'
// import { getCurrentUser, getAllUsers } from '../../actions/users'
// import { getAllPosts } from '../../actions/posts'
import Layout from "../common/Layout";

class ProjectList extends Component {
  // componentDidMount() {
  //   this.props.getAllPosts();
  //   this.props.getCurrentUser();
  //   this.props.getAllUsers();
  //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  //   this.forceUpdate();
  // }

  renderPost() {
    const posts = this.props.posts || [];

    return posts.map((post, index) => {
      return <li key={index}>title: {post.title} body: {post.body}</li>
    })
  }


  render() {
    return (
      <Layout title="Project List">
        <div style={{ margin: 8 }}>
          Project List.
        </div>
      </Layout>
    )
  }
}


export default ProjectList;