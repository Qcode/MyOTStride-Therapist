import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import People from '../Assets/People.png';
import Api from '../Api';
import './Header.css';

function Header(props) {
  return (
    <header>
      <div className="header__item">
        <NavLink to="/">
          <div className="NavBar__Logo-Background">
            <img src={People} alt="Logo" className="NavBar__Logo" />
          </div>
        </NavLink>
      </div>
      <div className="header__item">
        <NavLink className="NavBar__Title" to="/">
          <h2>MyOTStride</h2>
        </NavLink>
      </div>
      <div className="header__item">
        <span>
          <React.Fragment>
            <NavLink to="/">Home</NavLink> |{' '}
            <NavLink to="/" onClick={() => Api.logout()}>
              Logout
            </NavLink>
          </React.Fragment>
        </span>
      </div>
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func, goBack: PropTypes.func })
    .isRequired,
};
export default withRouter(Header);
