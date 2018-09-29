import React from 'react';
import Login from './Login';
import Api from '../Api';

function AuthenticatedRoute(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        validatedKey: Api.validatedKey,
      };
      this.authenticate();
    }

    authenticate() {
      if (!Api.validatedKey) {
        Api.request('therapists/:therapistId')
          .then(jsonData => {
            Api.validateKey(jsonData);
            this.setState({ validatedKey: true });
          })
          .catch();
      }
    }

    render() {
      if (this.state.validatedKey) {
        return <WrappedComponent {...this.props} />;
      }
      return <Login />;
    }
  };
}

export default AuthenticatedRoute;
