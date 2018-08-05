import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Api from './Api';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.sendUserInfo = this.sendUserInfo.bind(this);
  }

  handleEmail(text) {
    this.setState({ email: text.target.value });
  }

  handlePassword(text) {
    this.setState({ password: text.target.value });
  }

  sendUserInfo(event) {
    event.preventDefault();
    Api.request('login', {
      method: 'POST',
      body: {
        email: this.state.email,
        password: this.state.password,
        therapist: true,
      },
    })
      .then(jsonToken => {
        Api.setToken(jsonToken.token, jsonToken.id);
        this.props.history.push('/patients');
      })
      .catch(err => this.setState({ error: true }));
  }

  render() {
    return (
      <div id="LoginInfo">
        <form onSubmit={this.sendUserInfo}>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              required
              value={this.state.email}
              onChange={this.handleEmail}
            />
          </label>
          <br />
          <label htmlFor="password">
            Password:
            <input
              required
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.error && 'Error logging in.'}
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(LoginPage);
