import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import People from '../Assets/People.png';
import './PatientInformation.css';
import Api from '../Api';

function TopNavBar(props) {
  return (
    <div className="NavBar">
      <div className="NavBar__Logo-Background">
        <img src={People} alt="Logo" className="NavBar__Logo" />
      </div>
      <h2>MyOTStride</h2>
      <button
        type="button"
        className="NavBar__Text"
        onClick={() => {
          props.history.push('/');
          Api.setToken(null);
        }}
      >
        Logout
      </button>
    </div>
  );
}

TopNavBar.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func, goBack: PropTypes.func })
    .isRequired,
};
export default withRouter(TopNavBar);
