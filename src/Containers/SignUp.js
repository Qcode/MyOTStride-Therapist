import React from 'react';
import { withFormik, Form } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GetErrorText from '../utils/GetErrorText';
import Api from '../Api';
import './SignUp.css';

function SignUp(props) {
  return (
    <div>
      <h1>Therapist SignUp</h1>
      <Form className="SignUp__Form">
        <TextField
          className="SignUp__Input"
          label="First Name"
          onChange={props.handleChange}
          value={props.values.firstName}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          placeholder="E.g. John"
          name="firstName"
        />
        <TextField
          className="SignUp__Input"
          label="Last Name"
          name="lastName"
          onChange={props.handleChange}
          value={props.values.lastName}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          placeholder="E.g. Doe"
          required
        />
        <TextField
          className="SignUp__Input"
          label="Email"
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
          className="SignUp__Input"
          label="Password"
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
        <TextField
          className="SignUp__Input"
          label="Re-enter Your Password"
          type="password"
          name="passwordForVerification"
          onChange={props.handleChange}
          value={props.values.passwordForVerification}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          placeholder="********"
          required
        />
        <Button
          variant="contained"
          type="submit"
          disabled={props.isSubmitting}
          color="primary"
          className="SignUp__Button"
        >
          SignUp
        </Button>
        <Button
          variant="contained"
          type="button"
          onClick={() => props.history.push('/')}
          color="primary"
          className="SignUp__Button"
        >
          Return Home
        </Button>
        {props.errors.failedSubmit && <p>{props.errors.failedSubmit}</p>}
      </Form>
    </div>
  );
}
SignUp.propTypes = {
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    passwordForVerification: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
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
      passwordForVerification: '',
      firstName: '',
      lastName: '',
    }),
    handleSubmit: (values, formikBag) => {
      const failSubmit = reason => {
        formikBag.setSubmitting(false);
        formikBag.setErrors({ failedSubmit: reason });
      };

      if (values.password !== values.passwordForVerification) {
        failSubmit('Passwords do not match.');
        return;
      }

      Api.request('signup', {
        method: 'POST',
        body: {
          email: values.email,
          password: values.password,
          first_name: values.firstName,
          last_name: values.lastName,
          therapist: true,
        },
      })
        .then(() => {
          formikBag.props.history.push('/');
        })
        .catch((err) => {
          failSubmit(GetErrorText(err));
        });
    },
  })(SignUp),
);
