import React from 'react';
import { withFormik, Form } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Api from '../Api';
import GetErrorText from '../utils/GetErrorText';
import './Login.css';

function Login(props) {
  return (
    <div>
      <h1 className="Login__Title">Login</h1>
      <Form className="Login__Form">
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
        <Button
          variant="contained"
          type="button"
          onClick={() => props.history.push('/signup')}
          color="primary"
          className="Login__Button"
        >
          Create An Account
        </Button>
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
        .catch((err) => {
          formikBag.setSubmitting(false);
          formikBag.setErrors({ failedSubmit: GetErrorText(err) });
        }),
  })(Login),
);
