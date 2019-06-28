import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import EditActivity from './EditActivity';
import FeedbackList from './FeedbackList';
import ActivityCardItems from './ActivityCardItems';

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
    this.setState(prevState => ({
      ...prevState,
      editing: !prevState.editing,
    }));
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
    } else if (this.state.viewFeedback) {
      display = (
        <FeedbackList
          info={this.props.info}
          viewingFeedback={this.viewingFeedback}
        />
      );
    } else {
      display = (
        <React.Fragment>
          <ActivityCardItems
            title={this.props.info.title}
            description={this.props.info.description}
            getCalendar={this.getCalendar}
            dates={this.props.info.dates}
            Editing={this.Editing}
            deleteFunction={this.props.deleteFunction}
            info={this.props.info}
            viewingFeedback={this.viewingFeedback}
          />
        </React.Fragment>
      );
    }
    return <div className="container_card">{display}</div>;
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
