import React from 'react';
import { Redirect } from 'react-router-dom';
import Api from '../Api';

function AuthenticatedRoute(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        validatedKey: Api.validatedKey,
        failedToValidate: false,
      };
      this.authenticate();
    }

    authenticate() {
      if (!Api.validatedKey) {
        Api.request('therapists/:therapistId')
          .then(() => {
            Api.validateKey();
            this.setState({ validatedKey: true });
          })
          .catch(() => this.setState({ failedToValidate: true }));
      }
    }

    render() {
      if (this.state.validatedKey && !this.state.failedToValidate) {
        return <WrappedComponent {...this.props} />;
      }
      if (this.state.failedToValidate) {
        return <Redirect to="/" />;
      }
      return null;
    }
  };
}

export default AuthenticatedRoute;
