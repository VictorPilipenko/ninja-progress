import React from 'react';
import { NavLink } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { signupUser, validationUser } from '../../actions/auth'
import './Sign.css'
import logo from '../../assets/Logo_invert.png'

class Signup extends React.Component {

  handleEmailFieldBlur = (e, props) => {
    this.props.handleBlur(e)

    // do something
    // saveUserForm(this.props.values)
    // console.log('email: ',this.props.values.email)
    this.props.validationUser(this.props.values.email)
  }

  render() {
    const {
      values,
      touched,
      errors,
      // dirty,
      handleChange,
      handleBlur,
      handleSubmit,
      // handleReset,
      isSubmitting,
    } = this.props;
    return (
      <div className='wrapper'>
        <img className='signin-logo' src={logo} alt='logo' />
        <p className='top-text-first'>Get started with a free account</p>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className='form-container'>

              <label htmlFor="firstName" className='label'>
                First Name
              </label>
              <input
                id="firstName"
                placeholder="Enter your first name"
                type="text"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && touched.firstName && (
                <div className={`input-group ${errors.firstName && touched.firstName ? 'has-error' : ''}`}>{errors.firstName}</div>
              )}

              <label htmlFor="accountName" className='label'>
                Account Name
              </label>
              <input
                id="accountName"
                placeholder="Enter your account name"
                type="text"
                value={values.accountName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.accountName && touched.accountName && (
                <div className={`input-group ${errors.accountName && touched.accountName ? 'has-error' : ''}`}>{errors.accountName}</div>
              )}

              <label htmlFor="email" className='label'>
                Email Address
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={this.handleEmailFieldBlur}
              />
              {errors.email && touched.email && (
                <div className={`input-group ${errors.email && touched.email ? 'has-error' : ''}`}>{errors.email}</div>
              )}
              {this.props.emailValidationInfo && (
                <div className={`input-group-email ${this.props.emailValidationInfo ? 'has-error' : ''}`}>{this.props.emailValidationInfo}</div>
              )}

              <label htmlFor="password" className='label'>
                Password
              </label>
              <input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <div className={`input-group ${errors.password && touched.password ? 'has-error' : ''}`}>{errors.password}</div>
              )}

              <label htmlFor="passwordConfirm" className='label'>
                Confirm Password
              </label>
              <input
                id="passwordConfirm"
                placeholder="Confirm your password"
                type="password"
                value={values.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <div className={`input-group ${errors.passwordConfirm && touched.passwordConfirm ? 'has-error' : ''}`}>{errors.passwordConfirm}</div>
              )}

              {/* Server error message */}
              {this.props.errorMessage && this.props.errorMessage &&
                <div className="input-group">Oops! {this.props.errorMessage}</div>}

              <button className="btn" type="submit" disabled={isSubmitting}>
                Get Started
              </button>

            </div>
          </form>
        </div>

        {/* Signup button */}
        <div className="form-bottom-register">
          <NavLink to="/sign-in">Already have an account?</NavLink>
        </div>
      </div>
    );
  }
};

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'minimum 2 letters')
      .required('first name is required.'),
    accountName: Yup.string()
      .min(2, 'minimum 2 letters')
      .required('account name is required.'),
    email: Yup.string().email('invalid email address').required('email is required!'),
    password: Yup.string()
      .min(8, 'minimum 8 letters')
      .max(25, 'maximum 25 letters')
      .required('password is required.'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], "passwords must match")
      .required('password confirm is required')
  }),
  mapPropsToValues: () => ({
    firstName: '',
    accountName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }),
  handleSubmit: (payload, { props, setSubmitting }) => {
    // console.log(props)
    // console.log(payload)
    props.signupUser(payload);
    setSubmitting(false);
  },
  displayName: 'RegisterForm',
})(Signup);

const mapStateToProps = state => {
  console.log(state)
  return { 
    errorMessage: state.auth.error,
    emailValidationInfo: state.auth.emailValidationInfo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signupUser: arr => dispatch(signupUser(arr)),
    validationUser: arr => dispatch(validationUser(arr)),
  }
}

const Register = connect(
  mapStateToProps,
  mapDispatchToProps,
)(formikEnhancer)

export default Register;