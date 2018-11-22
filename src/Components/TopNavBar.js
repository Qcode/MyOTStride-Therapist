import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../Assets/People.png';
import './PatientInformation.css';

function TopNavBar(props) {
  return (
    <div className="NavBar">
      <img src={Logo} alt="Logo" className="NavBar__Logo" />
      <h2>MyOTStride</h2>
      <button
        type="button"
        className="NavBar__Text"
        onClick={() => props.history.push('/')}
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
