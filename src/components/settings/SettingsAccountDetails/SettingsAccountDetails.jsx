import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from "../../common/Layout";
import Cookies from "js-cookie";
import './SettingsAccountDetails.css'
import { changeUserName } from '../../../store/actions/settings'
import ChangeName from './ChangeUserName'
import ChangePassword from './ChangeUserPassword'
import ImageUpload from './ImageUpload'


class SettingsAccountDetails extends Component {

  componentDidMount = () => {
    // this.props.getAllFunnelsCollaboration()
  }

  state = {
    name: Cookies.get("userFirstName")
  }

  handleChangeName = e => this.setState({
    name: e.target.value
  });

  changeName = () => {
    this.props.changeUserName(this.state.name)
  }

  changePassword = () => {
    this.props.changeUserPassword(this.state.name)
  }

  render() {
    return (
      <Layout title="Account Details">
        <div className='settings-wrapper'>
          <ChangeName />
          <ImageUpload />
          <ChangePassword />
        </div>

      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    // data: state.collaborations.funnelsCollaborationsList,
    changeUserNameError: state.settings.changeUserNameError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // changeUserPassword: password => dispatch(changeUserPassword(password)),
    changeUserName: name => dispatch(changeUserName(name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAccountDetails);

