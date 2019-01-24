import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function PendingPatients(props) {
  return (
    <div>
      <h1>Pending Patients</h1>
      {props.patientList.length !== 0
        ? props.patientList.map(patient => (
            <Button
              key={patient.email}
              color="primary"
              variant="contained"
              onClick={() => props.connectFunction(patient.email)}
            >
              {`${patient.first_name} ${patient.last_name}`}
            </Button>
          ))
        : 'You have no pending patients'}
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
    }),
  ),
};
PendingPatients.defaultProps = {
  error: null,
  patientList: null,
};

export default PendingPatients;
