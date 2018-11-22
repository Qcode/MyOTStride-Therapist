import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Api from '../Api';
import CurrentPatients from '../Components/CurrentPatients';
import PendingPatients from '../Components/PendingPatients';

class PatientList extends React.Component {
  static pickClient(id) {
    Api.setClientId(id);
  }

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

  connectClient(email) {
    Api.request('/therapists/:therapistId/acceptClient', {
      method: 'POST',
      body: {
        clientEmail: email,
      },
    }).then(id => {
      const index = this.state.pendingList.findIndex(
        obj => obj.email === email,
      );
      const pendingList = this.state.pendingList.filter(
        obj => obj.email !== email,
      );
      this.setState(prevState => ({
        ...prevState,
        currentList: [
          ...prevState.currentList,
          { ...prevState.pendingList[index], id: id.id },
        ],
        pendingList,
      }));
    });
  }

  render() {
    return (
      <div>
        <CurrentPatients
          pickClient={PatientList.pickClient}
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
        <p>{this.state.error === null ? null : 'error'}</p>
      </div>
    );
  }
}

PatientList.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func, goBack: PropTypes.func })
    .isRequired,
};

export default withRouter(PatientList);
