import React from 'react';
import PropTypes from 'prop-types';

function GoalsList(props) {
  return (
    <div>
      {props.goals.map(info => (
        <div key={info.id} className="container">
          <h1>{info.title}</h1>
          <h1>{info.description}</h1>
        </div>
      ))}
      {props.error && <p>{props.error}</p>}
    </div>
  );
}

GoalsList.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.string,
};
GoalsList.defaultProps = {
  error: null,
};

export default GoalsList;
