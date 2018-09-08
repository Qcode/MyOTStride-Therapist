import React from 'react';
import PropTypes from 'prop-types';

function ActivitiesList(props) {
  return (
    <div>
      {props.activities.map(info => (
        <div key={info.id} className="container">
          <h1> {info.title}</h1>
          <h1>{info.description}</h1>
        </div>
      ))}
      {props.error && <p>Error</p>}
    </div>
  );
}

ActivitiesList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.string,
};
ActivitiesList.defaultProps = {
  error: null,
};

export default ActivitiesList;
