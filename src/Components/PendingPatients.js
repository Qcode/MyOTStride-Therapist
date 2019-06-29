import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './PendingPatients.css';

function PendingPatients(props) {
  return (
    <div>
      <div className="container">
        <h2>Pending Patients</h2>
        <div className="container__pendingPatients">
          {props.patientList.length !== 0 ? (
            props.patientList.map(patient => (
              <Button
                key={patient.email}
                color="primary"
                variant="contained"
                onClick={() => props.connectFunction(patient.email)}
              >
                {`${patient.first_name} ${patient.last_name}`}
              </Button>
            ))
          ) : (
            <p className="text__noPatients">You have no pending patients</p>
          )}
        </div>
      </div>
    </div>
  );
}
PendingPatients.propTypes = {
  patientList: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  ),
};
PendingPatients.defaultProps = {
  patientList: null,
};

export default PendingPatients;
