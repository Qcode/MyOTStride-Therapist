import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Api from './Api';
import CurrentPatients from './CurrentPatients';
import PendingPatients from './PendingPatients';

class PatientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: [],
      pendingList: [],
      error: null,
    };
    this.getCurrent();
    this.getPending();
    this.connectClient = this.connectClient.bind(this);
    this.pickClient = this.pickClient.bind(this);
  }

  getCurrent() {
    Api.request('/therapists/:therapistId/clients')
      .then(jsonData => this.setState({ currentList: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  getPending() {
    Api.request('/therapists/:therapistId/clientRequests')
      .then(jsonData => {
        this.setState({ pendingList: jsonData });
      })
      .catch(err => this.setState({ error: err }));
  }

  pickClient(id) {
    Api.setClientId(id);
    this.props.history.push('/patients/patientInfo');
  }

  connectClient(email) {
    Api.request('/therapists/:therapistId/acceptClient', {
      method: 'POST',
      body: {
        clientEmail: email,
      },
    }).then(id => {
      console.log(id)
      const index = this.state.pendingList.findIndex(obj => obj.id === id);
      this.setState(prevState => ({
        ...prevState,
        currentList: [
          ...prevState.currentList,
          Object.assign(...prevState.pendingList[index],id)
        ],
      }));
      console.log(this.state.currentList);
    });
  }

  render() {
    return (
      <div>
        <CurrentPatients
          pickClient={this.pickClient}
          patientList={this.state.currentList}
          error={this.state.error === null ? null : 'error'}
        />
        <PendingPatients
          patientList={this.state.pendingList}
          error={this.state.error === null ? null : 'error'}
          connectFunction={this.connectClient}
        />
        <input
          type="submit"
          value="Logout"
          onClick={() => {
            this.props.history.push('/');
            Api.setToken(null);
          }}
        />
      </div>
    );
  }
}

PatientList.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func, goBack: PropTypes.func })
    .isRequired,
};

export default withRouter(PatientList);
