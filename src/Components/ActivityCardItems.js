import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import Calendar from './Calendar';
import './ActivityCardItems.css';

const styles = {
  root: {
    position: 'absolute',
    bottom: '10px',
    'margin-left': 'auto',
    'margin-right': 'auto',
    transform: 'translateX(-50%)',
    left: '50%',
  },
};

function ActivityCardItems(props) {
  return (
    <div className="container_ActivityCardItems">
      <div className="activity-card__text-section">
        <div className="activity-card__title">
          <Button
            onClick={() => props.deleteFunction(props.info)}
            type="button"
          >
            <DeleteIcon />
          </Button>
          <Button type="button" onClick={() => props.Editing()}>
            <EditIcon />
          </Button>
          <h2>{props.title}</h2>
        </div>
        <p>{props.description}</p>
        <Button
          className={props.classes.root}
          color="primary"
          variant="contained"
          onClick={() => props.viewingFeedback()}
        >
          View Feedback
        </Button>
      </div>
      <div className="div_Calendar">
        <Calendar
          getCalendar={props.getCalendar}
          dates={props.dates}
          edit={false}
        />
      </div>
    </div>
  );
}

ActivityCardItems.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  getCalendar: PropTypes.func.isRequired,
  dates: PropTypes.arrayOf(PropTypes.string),
  deleteFunction: PropTypes.func.isRequired,
  info: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
  }),
  Editing: PropTypes.bool.isRequired,
  viewingFeedback: PropTypes.func.isRequired,
};
ActivityCardItems.defaultProps = {
  title: null,
  description: null,
  dates: null,
  info: null,
};

export default withStyles(styles)(ActivityCardItems);
