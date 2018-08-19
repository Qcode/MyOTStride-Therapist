import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function ViewPatientInformationPage(props) {
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
    </div>
  );
}

ViewPatientInformationPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func, goBack: PropTypes.func })
    .isRequired,
};

export default withRouter(ViewPatientInformationPage);
