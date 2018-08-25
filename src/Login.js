import React from 'react';
import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Api from './Api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.login = this.login.bind(this);
  }

  login(values, actions) {
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
        this.props.history.push('/patients');
        actions.setSubmitting(false);
      })
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div id="LoginInfo">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={this.login}
          render={({ values, isSubmitting }) => (
            <Form>
              <Field
                type="email"
                name="email"
                placeholder="email"
                value={values.email}
              />
              <br />
              <Field
                placeholder="password"
                type="password"
                name="password"
                value={values.password}
              />
              <br />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        />
        {this.state.error && 'Error logging in.'}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(Login);
