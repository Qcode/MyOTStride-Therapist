import React from 'react';
import PropTypes from 'prop-types';
import PatientInformation from './PatientInformation';

function CurrentPatients(props) {
  return (
    <div>
      <h1>Current Patients</h1>
      {props.patientList.map(patient => (
        <div className="container" key={patient.id}>
          <h2>{`${patient.first_name} ${patient.last_name}`}</h2>
          <PatientInformation pickClient={props.pickClient} patient={patient} />
        </div>
      ))}
      {props.error}
    </div>
  );
}
CurrentPatients.propTypes = {
  error: PropTypes.string,
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
  error: null,
  patientList: null,
};

export default CurrentPatients;
