import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import EditGoal from './EditGoal';

function GoalsList(props) {
  return (
    <div>
      {props.goals.map(info => (
        <div key={info.id} className="container">
          <h1>{info.title}</h1>
          <h1>{info.description}</h1>
          <h1>{info.end_date}</h1>
          <Button onClick={() => props.deleteFunction(info)} type="button">
            <DeleteIcon fontsize="large" />
          </Button>
          <Button type="button">
            <EditIcon />
          </Button>
          <EditGoal
            editFunction={props.editFunction}
            info={info}
            error={props.error}
          />
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
    }),
  ).isRequired,
  error: PropTypes.string,
  editFunction: PropTypes.func.isRequired,
};
GoalsList.defaultProps = {
  error: null,
};

export default GoalsList;
