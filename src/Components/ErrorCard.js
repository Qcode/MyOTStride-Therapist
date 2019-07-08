import React from 'react';
import PropTypes from 'prop-types';
import GetErrorCodeText from '../utils/GetErrorCodeText';

function ErrorCard(props) {
  return (
    <div>
      {props.error !== null ? (
        <div className="container">
          <p>{GetErrorCodeText(props.error)}</p>
        </div>
      ) : null}
    </div>
  );
}

ErrorCard.propTypes = {
  error: PropTypes.string,
};
ErrorCard.defaultProps = {
  error: null,
};

export default ErrorCard;
