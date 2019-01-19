import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import EditActivity from './EditActivity';
import Calendar from './Calendar';
import FeedbackList from './FeedbackList';

const styles = {
  edit: {
    position: 'absolute',
    right: '0px',
  },
  delete: {
    position: 'absolute',
    right: '60px',
  },
};

class ActivityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      viewFeedback: false,
    };
    this.Editing = this.Editing.bind(this);
    this.viewingFeedback = this.viewingFeedback.bind(this);
  }

  Editing() {
    this.setState({ editing: false });
  }

  viewingFeedback() {
    this.setState(prevState => ({
      ...prevState,
      viewFeedback: !prevState.viewFeedback,
    }));
  }

  render() {
    let display;
    if (this.state.editing) {
      display = (
        <EditActivity
          Editing={this.Editing}
          editFunction={this.props.editFunction}
          info={this.props.info}
        />
      );
    }
    if (this.state.viewFeedback) {
      display = (
        <FeedbackList
          info={this.props.info}
          viewingFeedback={this.viewingFeedback}
        />
      );
    } else {
      display = (
        <React.Fragment>
          <Button
            onClick={() => this.props.deleteFunction(this.props.info)}
            type="button"
            classes={{ root: this.props.classes.delete }}
          >
            <DeleteIcon />
          </Button>
          <Button
            classes={{ root: this.props.classes.edit }}
            type="button"
            onClick={() => this.setState({ editing: true })}
          >
            <EditIcon />
          </Button>
          <h2>Title:</h2>
          <p>{this.props.info.title}</p>
          <h2>Description:</h2>
          <p>{this.props.info.description}</p>
          <Calendar
            getCalendar={this.getCalendar}
            dates={this.props.info.dates}
            edit={false}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.viewingFeedback()}
          >
            View Feedback
          </Button>
        </React.Fragment>
      );
    }
    return <div className="container">{display}</div>;
  }
}
ActivityCard.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  editFunction: PropTypes.func.isRequired,
  deleteFunction: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    delete: PropTypes.shape({
      position: PropTypes.string,
      right: PropTypes.string,
    }),
    edit: PropTypes.shape({
      position: PropTypes.string,
      right: PropTypes.string,
    }),
  }).isRequired,
};

export default withStyles(styles)(ActivityCard);
