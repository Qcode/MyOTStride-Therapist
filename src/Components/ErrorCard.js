import React from 'react';
import PropTypes from 'prop-types';
import GetErrorText from '../utils/GetErrorText';

function ErrorCard(props) {
  return (
    <div>
      {props.error !== null ? (
        <div className="container">
          <p>{GetErrorText(props.error)}</p>
        </div>
      ) : null}
    </div>
  );
}

ErrorCard.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorCard;
