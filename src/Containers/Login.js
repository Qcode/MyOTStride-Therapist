import React from 'react';
import { withFormik, Field, Form } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Api from '../Api';

function Login(props) {
  return (
    <div>
      <h1>Login</h1>
      <Form>
        <Field
          type="email"
          name="email"
          placeholder="email"
          value={props.values.email}
        />
        <br />
        <Field
          placeholder="password"
          type="password"
          name="password"
          value={props.values.password}
        />
        <br />
        <button type="submit" disabled={props.isSubmitting}>
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
          Api.validateKey();
          formikBag.props.history.push('/patients');
        })
        .catch(() => {
          formikBag.setSubmitting(false);
          formikBag.setErrors({ failedSubmit: 'Error logging in.' });
        }),
  })(Login),
);
