import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function PatientInformation(props) {
  return (
    <div>
      <input
        type="button"
        value="View Activities"
        onClick={() => props.history.push('/patients/patientInfo/activities')}
      />
      <input
        type="button"
        value="View Goals"
        onClick={() => props.history.push('/patients/patientInfo/goals')}
      />
      <input
        type="button"
        value="View Feedback"
        onClick={() => props.history.push('/patients/patientInfo/feedback')}
      />
    </div>
  );
}

PatientInformation.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func, goBack: PropTypes.func })
    .isRequired,
};

export default withRouter(PatientInformation);
