import React from 'react';
import PropTypes from 'prop-types';

function GoalsList(props) {
  return (
    <div>
      {props.patientInfo.map(info => (
        <div key={info.id} className="div--listItems">
          <h1>{info.title}</h1>
          <h1>{info.description}</h1>
        </div>
      ))}
      {props.error && <p>Error</p>}
    </div>
  );
}

GoalsList.propTypes = {
  patientInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.string,
};
GoalsList.defaultProps = {
  error: null,
};

export default GoalsList;
