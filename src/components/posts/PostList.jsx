import React, { Component } from 'react';
import { getCurrentUser } from '../../actions/users';
import { getAllPosts } from '../../actions/posts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Feature extends Component {
  componentWillMount() {
    this.props.getAllPosts();
    this.props.getCurrentUser();

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  renderUsers() {
    const posts = this.props.posts || [];
    console.log(this.props);

    return posts.map((item, i) => {
      return <li key={i}>{item.name}</li> // name нету. пока не знаю что там будет
    })
  }

  render() {
    return (
      <div className="content users">
        <h1>Hello, {this.currentUser.name}</h1>
        <p>Here are all auth protected users posts! :)</p>
        <ul>
          {this.renderUsers()}
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
    getAllPosts
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Feature);