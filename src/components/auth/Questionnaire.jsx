import React from 'react';
import { NavLink } from 'react-router-dom'
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { questionnaireUser } from '../../actions/auth'
import './Sign.css'
import logo from '../../assets/Logo_invert.png'
import classNames from "classnames";

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-group")}>{error}</div> : null;

// Radio input
const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <label className="container-checkbox">{label}
        <input
          name={name}
          id={id}
          type="radio"
          value={id} // could be something else for output?
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

// Radio group
const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children
}) => {
  const classes = classNames(
    "input-group",
    {
      '': value || (!error && touched), // handle prefilled or user-filled
      "has-error": !!error && touched
    },
    className
  );

  return (
    <div className={classes}>
      {children}
      {touched && <InputFeedback error={error} />}
    </div>
  );
};



class Questionnaire extends React.Component {
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
        <p className='top-text-first'>Welcome to Funnelsmap</p>
        <p className='top-text-second-questionnaire'>Your account was successfully created</p>
        <p className='top-text-third'>Please tell us more about yourself!</p>
        <p className='top-text-fourth'> This will help us to provide you with the best free funnel templates.</p>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className='form-container'>
              <p style={{ margin: '0px 0px 20px 0', fontWeight: 'bolder' }}>What describes you best?</p>

              <RadioButtonGroup
                id="radioGroup"
                value={values.radioGroup}
                error={errors.radioGroup}
                touched={touched.radioGroup}
              >

                <div className='checkbox-wrapper-four'>

                  <div className='checkbox-wrapper-two'>
                    <div className='checkbox-wrapper'>
                      <Field
                        component={RadioButton}
                        name="radioGroup"
                        id="Freelancer"
                        label="Freelancer"
                      />
                    </div>
                    <div className='checkbox-wrapper'>
                      <Field
                        component={RadioButton}
                        name="radioGroup"
                        id="Agency"
                        label="Agency"
                      />
                    </div>
                  </div>

                  <div className='checkbox-wrapper-two'>
                    <div className='checkbox-wrapper'>
                      <Field
                        component={RadioButton}
                        name="radioGroup"
                        id="Company"
                        label="Company"
                      />
                    </div>
                    <div className='checkbox-wrapper'>
                      <Field
                        component={RadioButton}
                        name="radioGroup"
                        id="Other"
                        label="Other"
                      />
                    </div>
                  </div>

                </div>
              </RadioButtonGroup>



              {values.radioGroup === 'Company' ?
                <>
                  <label htmlFor="companyName" className='label'>
                    Company name
                  </label>
                  <input
                    id="companyName"
                    placeholder="Company name"
                    type="text"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.companyName && touched.companyName && (
                    <div className={`input-group ${errors.companyName && touched.companyName ? 'has-error' : ''}`}>{errors.companyName}</div>
                  )}

                  <label htmlFor="companyWebsite" className='label'>
                    Company website
                  </label>
                  <input
                    id="companyWebsite"
                    placeholder="Company website"
                    type="text"
                    value={values.companyWebsite}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.companyWebsite && touched.companyWebsite && (
                    <div className={`input-group ${errors.companyWebsite && touched.companyWebsite ? 'has-error' : ''}`}>{errors.companyWebsite}</div>
                  )}
                </>
                :
                null
              }

              {values.radioGroup === 'Agency' ?
                <>
                  <label htmlFor="agencyName" className='label'>
                    Agency name
                  </label>
                  <input
                    id="agencyName"
                    placeholder="Agency name"
                    type="text"
                    value={values.agencyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.agencyName && touched.agencyName && (
                    <div className={`input-group ${errors.agencyName && touched.agencyName ? 'has-error' : ''}`}>{errors.agencyName}</div>
                  )}

                  <label htmlFor="agencyWebsite" className='label'>
                    Agency website
                  </label>
                  <input
                    id="agencyWebsite"
                    placeholder="Agency website"
                    type="text"
                    value={values.agencyWebsite}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.agencyWebsite && touched.agencyWebsite && (
                    <div className={`input-group ${errors.agencyWebsite && touched.agencyWebsite ? 'has-error' : ''}`}>{errors.agencyWebsite}</div>
                  )}
                </>
                :
                null
              }

              {/* Server error message */}
              {this.props.errorMessage && this.props.errorMessage.signin &&
                <div className="input-group">Oops! {this.props.errorMessage.signin}</div>}

              <button className="btn" type="submit" disabled={isSubmitting}>
                Get Started
              </button>

              <div className="form-password-forgot">
                <NavLink to="/">Skip</NavLink>
              </div>

            </div>
          </form>
        </div>

        {/* Signup button */}
        <div className="form-bottom-register">
          <NavLink to="/sign-in">Already have an account?</NavLink>
        </div>
      </div >
    );
  }
};

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // companyName: Yup.string()
    //   .min(2, 'minimum 2 letters')
    //   .required('firstname is required.'),
    // companyWebsite: Yup.string()
    //   .min(2, 'minimum 2 letters')
    //   .required('firstname is required.'),
    // email: Yup.string().email('Invalid email address').required('Email is required!'),
    // password: Yup.string()
    //   .min(6, 'minimum 6 letters')
    //   .required('password is required.'),
    // passwordConfirm: Yup.string()
    //   .oneOf([Yup.ref('password')], "Passwords must match")
    //   .required('password confirm is required'),


    // freelancer: Yup.array().required(
    //   "At least one checkbox is required"
    // ),

    // freelancer: Yup.bool().oneOf([false], "Must agree to something")
    // radioGroup: Yup.string().required("A radio option is required"),
  }),
  mapPropsToValues: () => ({
    companyName: '',
    companyWebsite: '',
    agencyName: '',
    agencyWebsite: '',
    radioGroup: '',
  }),
  handleSubmit: (payload, { props, setSubmitting }) => {
    console.log('payload', payload)
    props.questionnaireUser(payload);
    setSubmitting(false);
  },
  displayName: 'QuestionnaireForm',
})(Questionnaire);

const mapStateToProps = state => {
  return { errorMessage: state.auth.error }
}

const mapDispatchToProps = dispatch => {
  return {
    questionnaireUser: arr => dispatch(questionnaireUser(arr)),
  }
}

const QuestionnaireForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(formikEnhancer)

export default QuestionnaireForm;