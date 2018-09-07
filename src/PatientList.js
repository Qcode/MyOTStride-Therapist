import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Api from './Api';

class PatientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientList: [],
      error: '',
    };
    this.getList();
    this.pickClient = this.pickClient.bind(this);
  }

  getList() {
    Api.request('/therapists/:therapistId/clients')
      .then(jsonData => this.setState({ patientList: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  pickClient(id) {
    Api.setClientId(id);
    this.props.history.push('/patients/patientInfo');
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.patientList.map(patient => (
            <li key={patient.id}>
              <input
                type="button"
                required
                value={`${patient.first_name} ${patient.last_name}`}
                onClick={() => {
                  this.pickClient(patient.id);
                }}
              />
            </li>
          ))}
        </ul>
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
