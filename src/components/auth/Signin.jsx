import React from 'react';
import { NavLink } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { signinUser } from '../../store/actions/auth'
import './Sign.css'
import logo from '../../assets/Logo_invert.png'

class Signin extends React.Component {
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
        <p className='top-text-first'>Map your sales funnel, the easy way.</p>
        <p className='top-text-second'>Create a strategy, build a template, start the implementation.</p>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className='form-container'>
              <p className='login-label'>Log In</p>
              <label htmlFor="email" className='label'>
                Email Address
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className={`input-group ${errors.email && touched.email ? 'has-error' : ''}`}>{errors.email}</div>
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

              {/* Server error message */}
              {this.props.errorMessage && this.props.errorMessage &&
                <div className="input-group">Oops! {this.props.errorMessage}</div>}

              <button className="btn" type="submit" disabled={isSubmitting}>
                Log In
              </button>

              <div className="form-password-forgot">
                <NavLink to="/password-forgot-step-1">Forgot your password?</NavLink>
              </div>

            </div>
          </form>
        </div>

        {/* Signup button */}
        <div className="form-bottom">
          <p>Dont have an account?</p>
          <NavLink to="/sign-up">Sign up now, it's free!</NavLink>
        </div>
        <div className='empty-space'/>
      </div>
    );
  }
};

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required!'),
    password: Yup.string()
      .min(8, 'Minimum 8 letters')
      .required('Password is required.')
  }),
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  handleSubmit: (payload, { props, setSubmitting }) => {
    // console.log(props)
    props.signinUser(payload);
    setSubmitting(false);
  },
  displayName: 'LoginForm',
})(Signin);

const mapStateToProps = state => {
  return { errorMessage: state.auth.error }
}

const mapDispatchToProps = dispatch => {
  return {
    signinUser: arr => dispatch(signinUser(arr)),
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(formikEnhancer)

export default Login;