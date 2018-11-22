import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PatientInformation.css';
import Logo from '../Assets/People.png';

function PatientInformation(props) {
  return (
    <div className="NavBar">
      <img src={Logo} alt="Logo" className="NavBar__Logo" />
      <button
        type="button"
        href="#"
        className="NavBar__Text"
        onClick={() => props.history.push('/patients/patientInfo/activities')}
      >
        View Activities
      </button>
      <button
        type="button"
        href="#"
        className="NavBar__Text"
        onClick={() => props.history.push('/patients/patientInfo/goals')}
      >
        View Goals
      </button>
      <button
        type="button"
        href="#"
        className="NavBar__Text"
        onClick={() => props.history.push('/patients/patientInfo/feedback')}
      >
        View Feedback
      </button>
      <button
        type="button"
        href="#"
        className="NavBar__Text"
        onClick={() => props.history.push('/patients/patientInfo/strategies')}
      >
        View Strategies
      </button>
    </div>
  );
}

PatientInformation.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func, goBack: PropTypes.func })
    .isRequired,
};

export default withRouter(PatientInformation);
