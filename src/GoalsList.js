import React from 'react';
import PropTypes from 'prop-types';

function GoalsList(props) {
  return (
    <div>
      {props.patientInfo.map(info => (
        <div key={info.id}>
          <p className="Titles_Text">
            {' '}
            {props.type === 'activities' ? info.title : ''}
          </p>
          <p className="Titles_Text">{info.description}</p>
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
  type: PropTypes.string,
};
GoalsList.defaultProps = {
  error: null,
  type: null,
};

export default GoalsList;
