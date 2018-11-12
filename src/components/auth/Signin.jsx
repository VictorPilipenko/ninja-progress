import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/auth';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div>
    <input type={type} placeholder={placeholder} {...input} />
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

class Signin extends Component {

  handleFormSubmit = (props) => {
    this.props.signinUser(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="form-container">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>

          {/* Email */}
          <Field name="email" component={renderField} type="text" placeholder="Email" />

          {/* Password */}
          <Field name="password" component={renderField} type="password" placeholder="Password" />

          {/* Server error message */}
          { this.props.errorMessage && this.props.errorMessage.signin &&
              <div className="error-container signin-error">Oops! { this.props.errorMessage.signin }</div> }

          {/* Signin button */}
          <button type="submit" className="btn">Sign in</button>

          {/* Signup button */}
          <div className="form-bottom">
            <p>Don't have an account?</p>
            <NavLink to="/signup">Click here to sign up</NavLink>
          </div>
        </form>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {};

  if(!formProps.email) {
    errors.email = 'Email is required'
  }

  if(!formProps.password) {
    errors.password = 'Password is required'
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

Signin = reduxForm({ form: 'signin', validate })(Signin);

export default connect(mapStateToProps, actions)(Signin);
