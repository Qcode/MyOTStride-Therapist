import React from 'react';
import PropTypes from 'prop-types';
import PatientInformation from './PatientInformation';
import './CurrentPatients.css';

function CurrentPatients(props) {
  return (
    <div>
      <h1>Current Clients</h1>
      <div className="container__patientCards">
        {props.patientList.length === 0 || props.patientList === null ? (
          <div className="container">
            <p>You have not connected with any clients yet.</p>
          </div>
        ) : (
          props.patientList.map(patient => (
            <div className="container_patientCard" key={patient.id}>
              <h2>{`${patient.first_name} ${patient.last_name}`}</h2>
              <PatientInformation
                pickClient={props.pickClient}
                patient={patient}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
CurrentPatients.propTypes = {
  pickClient: PropTypes.func.isRequired,
  patientList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  ),
};
CurrentPatients.defaultProps = {
  patientList: null,
};

export default CurrentPatients;
