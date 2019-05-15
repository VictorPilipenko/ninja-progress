import React from 'react';
import './Sign.css'
import logo from '../../assets/Logo_invert.png'


const Dashboard = () => {
  // console.log(console.log(localStorage.getItem('profile')))

  return (
    <div className='wrapper'>
      <img className='signin-logo' src={logo} alt='logo' />
      <p className='top-text-first'>We have sent an email to the account with the email</p>
      <p className='top-text-third'>Please check your email history to ensure that this is the email you used when registering </p>
      <p className='top-text-fourth'>with Funnelytics. If so, you should receive a password-reset email shortly.</p>
    </div>
  );
}

export default Dashboard;