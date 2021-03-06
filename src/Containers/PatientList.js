import React from 'react';
import { withRouter } from 'react-router-dom';

import Api from '../Api';
import CurrentPatients from '../Components/CurrentPatients';
import PendingPatients from '../Components/PendingPatients';
import ErrorCard from '../Components/ErrorCard';

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
    this.downloadFile = this.downloadFile.bind(this);
  }

  getCurrent() {
    Api.request('/therapists/:therapistId/clients')
      .then(jsonData => {
        const patientList = jsonData.sort((a, b) => {
          if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
            return -1;
          }
          if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) {
            return 1;
          }
          if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) {
            return -1;
          }
          if (a.last_name.toLowerCase() > b.last_name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        this.setState({ currentList: patientList });
      })
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

  downloadFile(patient) {
    Api.requestNonJson(`/clients/${patient.id}/export`)
      .then(data => data.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = `${patient.first_name}_${patient.last_name}_data.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  render() {
    return (
      <div>
        <CurrentPatients
          pickClient={PatientList.pickClient}
          patientList={this.state.currentList}
          downloadFile={this.downloadFile}
        />
        <ErrorCard error={this.state.error} />
        <PendingPatients
          patientList={this.state.pendingList}
          connectFunction={this.connectClient}
        />
      </div>
    );
  }
}

export default withRouter(PatientList);
