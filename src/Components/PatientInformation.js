import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PatientInformation.css';

function PatientInformation(props) {
  return (
    <div className="Container">
      <button
        type="button"
        onClick={() => {
          props.pickClient(props.patient.id);
          props.history.push('/patients/patientInfo/activities');
        }}
      >
        View Activities
      </button>
      <button
        type="button"
        onClick={() => {
          props.pickClient(props.patient.id);
          props.history.push('/patients/patientInfo/goals');
        }}
      >
        View Goals
      </button>
      <button
        type="button"
        onClick={() => {
          props.pickClient(props.patient.id);
          props.history.push('/patients/patientInfo/feedback');
        }}
      >
        View Feedback
      </button>
      <button
        type="button"
        onClick={() => {
          props.pickClient(props.patient.id);
          props.history.push('/patients/patientInfo/strategies');
        }}
      >
        View Strategies
      </button>
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
