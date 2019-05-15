import React, { Component } from 'react'
import Layout from "../common/Layout";


class CreateProject extends Component {
  componentDidMount() {
    // this.props.getCurrentUser(); // для вызова localStorage.getItem в экшене createPost
    //this.forceUpdate();
  }

  render() {
    return (
      <Layout title='Create Project'>
        <div style={{ margin: 8 }}>
          Create Project.
        </div>
      </Layout>
    )
  }
}

export default CreateProject