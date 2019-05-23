import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from "../../common/Layout";
// import Cookies from "js-cookie";
import './SettingsUsers.css'

class SettingsUsers extends Component {

  render() {
    return (
      <Layout title="Users">
        <div className='settings-wrapper'>
          <div style={{ margin: 8 }}>
            Users
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    // data: state.collaborations.funnelsCollaborationsList,
    // error: state.collaborations.funnelsCollaborationsListError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // getAllFunnelsCollaboration: () => dispatch(getAllFunnelsCollaboration()),
    // changeUserName: name => dispatch(saveUserName(name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsUsers);

