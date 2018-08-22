import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Api from './Api';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.loginToMyApp = this.loginToMyApp.bind(this);
  }

  loginToMyApp(values) {
    Api.request('login', {
      method: 'POST',
      body: {
        email: values.email,
        password: values.password,
        therapist: true,
      },
    })
      .then(jsonToken => {
        Api.setToken(jsonToken.token);
        Api.setTherapistId(jsonToken.id);
        this.props.history.push('/patients');
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
          onSubmit={values => {
            this.loginToMyApp(values);
          }}
          render={({
            values,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        />
        {this.state.error && 'Error logging in.'}
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(LoginPage);
