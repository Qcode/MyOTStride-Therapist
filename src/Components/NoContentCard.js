import React from 'react';
import PropTypes from 'prop-types';

function NoContentCard(props) {
  return (
    <div className="container">
      <p>The client has no {props.type} to display</p>
    </div>
  );
}

NoContentCard.propTypes = {
  type: PropTypes.string.isRequired,
};

export default NoContentCard;
