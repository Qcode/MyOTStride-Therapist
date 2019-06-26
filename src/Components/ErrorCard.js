import React from 'react';
import PropTypes from 'prop-types';

function ErrorCard(props) {
  return (
    <div className="container">
      <p>{props.error}</p>
    </div>
  );
}

ErrorCard.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorCard;
