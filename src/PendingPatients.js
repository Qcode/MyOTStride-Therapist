import React from 'react';
import PropTypes from 'prop-types';

function PendingPatients(props) {
  return (
    <div>
      <h1>Pending Patients</h1>
      <ul>
        {props.patientList.length !== 0
          ? props.patientList.map(patient => (
              <li key={patient.email}>
                <input
                  type="button"
                  value={`${patient.first_name} ${patient.last_name}`}
                  onClick={() => {
                    props.connectFunction(patient.email);
                  }}
                />
              </li>
            ))
          : 'You have no pending patients'}
      </ul>
      {props.error}
    </div>
  );
}
PendingPatients.propTypes = {
  error: PropTypes.string,
  patientList: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    })
  ),
};
PendingPatients.defaultProps = {
  error: null,
  patientList: null,
};

export default PendingPatients;
