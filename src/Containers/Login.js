import React from 'react';
import { withFormik, Form } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Api from '../Api';
import './Login.css';

function Login(props) {
  return (
    <div>
      <h1 className="Login__Title">Login</h1>
      <Form className="Login__Form">
        <TextField
          label="Email"
          className="Login__Input"
          placeholder="Email"
          type="email"
          name="email"
          onChange={props.handleChange}
          value={props.values.email}
          variant="outlined"
        />
        <br />
        <TextField
          label="Password"
          className="Login__Input"
          placeholder="Password"
          type="password"
          name="password"
          onChange={props.handleChange}
          value={props.values.password}
          variant="outlined"
        />
        <br />
        <button
          className="Login__Button"
          type="submit"
          disabled={props.isSubmitting}
        >
          Login
        </button>
        {props.errors.failedSubmit && <p>{props.errors.failedSubmit}</p>}
      </Form>
    </div>
  );
}

Login.propTypes = {
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    failedSubmit: PropTypes.string,
  }).isRequired,
};

export default withRouter(
  withFormik({
    mapPropsToValues: () => ({
      email: '',
      password: '',
    }),
    handleSubmit: (values, formikBag) =>
      Api.request('login', {
        method: 'POST',
        body: {
          email: values.email,
          password: values.password,
          therapist: true,
        },
      })
        .then(userData => {
          Api.setToken(userData.token);
          Api.setTherapistId(userData.id);
          formikBag.props.history.push('/patients');
        })
        .catch(() => {
          formikBag.setSubmitting(false);
          formikBag.setErrors({ failedSubmit: 'Error logging in.' });
        }),
  })(Login)
);
