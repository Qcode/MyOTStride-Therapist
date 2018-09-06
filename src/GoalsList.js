import React from 'react';
import PropTypes from 'prop-types';
import EditGoals from './EditGoals';

function GoalsList(props) {
  return (
    <div>
      {props.patientInfo.map(info => (
        <div key={info.id} className="div--listItems">
          <h1>{info.title}</h1>
          <h1>{info.description}</h1>
          <button onClick={() => props.deleteFunction(info)} type="button">
            {' '}
            delete
          </button>
          <EditGoals
            editFunction={props.editFunction}
            info={info}
            error={props.error}
          />
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
  editFunction: PropTypes.func.isRequired,
};
GoalsList.defaultProps = {
  error: null,
};

export default GoalsList;
