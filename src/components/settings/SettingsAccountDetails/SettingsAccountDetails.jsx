import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from "../../common/Layout";
import Cookies from "js-cookie";
import './SettingsAccountDetails.css'
import { saveUserName } from '../../../store/actions/settings'


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
    console.log('funnelsCollaborationsList: ', this.props.data)
    console.log('funnelsCollaborationsListError: ', this.props.error)
    return (
      <Layout title="Account Details">
        <div className='settings-wrapper'>

          <div className='settings-box'>
            <label className='settings-box-label'>Your Account Details</label>
            <br />

            <div className='setting-input-wrapper'>
              <label className='settings-label-input'>
                Name
              </label>
              <br />
              <input
                className='setting-input'
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </div>

            <button className='btn btn-1' onClick={() => this.saveName}>Save</button>
          </div>

          <div className='settings-box'>
            <label className='settings-box-label'>Reset Your Password</label>

            <div className='setting-input-wrapper'>
              <label className='settings-label-input'>
                Current Password
              </label>
              <br />
              <input
                className='setting-input'
                ref={ref => this.name = ref}
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </div>

            <div className='setting-input-wrapper'>
              <label className='settings-label-input'>
                New Password
              </label>
              <br />
              <input
                className='setting-input'
                ref={ref => this.name = ref}
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </div>

            <div className='setting-input-wrapper'>
              <label className='settings-label-input'>
                Confirm Password
              </label>
              <br />
              <input
                className='setting-input'
                ref={ref => this.name = ref}
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </div>

            <button className='btn btn-1' onClick={() => this.changePassword}>Enter a Valid Password</button>

          </div>

          <div className='settings-box'>
            <label className='settings-box-label'>Your Avatar</label>
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
    changeUserName: name => dispatch(saveUserName(name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAccountDetails);

