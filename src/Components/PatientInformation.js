import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function PatientInformation(props) {
  return (
    <div className="Container">
      <input
        type="button"
        value="View Activities"
        onClick={() => {
          props.pickClient(props.patient.id);
          props.history.push('/patients/patientInfo/activities');
        }}
      />
      <input
        type="button"
        value="View Goals"
        onClick={() => {
          props.pickClient(props.patient.id);
          props.history.push('/patients/patientInfo/goals');
        }}
      />
      <input
        type="button"
        value="View Feedback"
        onClick={() => {
          props.pickClient(props.patient.id);
          props.history.push('/patients/patientInfo/feedback');
        }}
      />
      <input
        type="button"
        value="View Strategies"
        onClick={() => {
          props.pickClient(props.patient.id);
          props.history.push('/patients/patientInfo/strategies');
        }}
      />
    </div>
  );
}

PatientInformation.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func, goBack: PropTypes.func })
    .isRequired,
  pickClient: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};
PatientInformation.defaultProps = {
  patient: null,
};

export default withRouter(PatientInformation);
