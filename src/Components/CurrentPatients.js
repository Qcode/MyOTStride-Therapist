import React from 'react';
import PropTypes from 'prop-types';

function CurrentPatients(props) {
  return (
    <div>
      <h1> Current Patients </h1>
      <ul>
        {props.patientList.map(patient => (
          <li key={patient.id}>
            <input
              type="button"
              required
              value={`${patient.first_name} ${patient.last_name}`}
              onClick={() => {
                props.pickClient(patient.id);
              }}
            />
          </li>
        ))}
      </ul>
      {props.error}
    </div>
  );
}
CurrentPatients.propTypes = {
  error: PropTypes.string,
  patientList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    })
  ),
};
CurrentPatients.defaultProps = {
  error: null,
  patientList: null,
};

export default CurrentPatients;
