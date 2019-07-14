import React from 'react';
import { withFormik, Form } from 'formik';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Api from '../Api';
import GetErrorCodeText from '../utils/GetErrorCodeText';
import './Login.css';

function Login(props) {
  return (
    <React.Fragment>
      <h1>Login</h1>
      <div className="container">
        <Form>
          <TextField
            label="Email"
            className="Login__Input"
            type="email"
            name="email"
            onChange={props.handleChange}
            value={props.values.email}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            placeholder="therapist@therapy.org"
            required
          />
          <TextField
            label="Password"
            className="Login__Input"
            type="password"
            name="password"
            onChange={props.handleChange}
            value={props.values.password}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            placeholder="********"
            required
          />
          <Button
            variant="contained"
            type="submit"
            className="Login__Button"
            disabled={props.isSubmitting}
            color="primary"
          >
            Login
          </Button>
          {props.errors.failedSubmit && <p>{props.errors.failedSubmit}</p>}
        </Form>
        <p>
          New to MyOTStride? Try{' '}
          <NavLink to="/signup">creating an account!</NavLink>
        </p>
      </div>
    </React.Fragment>
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
  history: PropTypes.shape({ push: PropTypes.func, goBack: PropTypes.func })
    .isRequired,
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
        .catch(err => {
          formikBag.setSubmitting(false);
          formikBag.setErrors({ failedSubmit: GetErrorCodeText(err) });
        }),
  })(Login),
);
