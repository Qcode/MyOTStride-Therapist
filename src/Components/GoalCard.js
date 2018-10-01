import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import EditGoal from './EditGoal';
import './GoalCard.css';

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

class GoalCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay() {
    this.setState({ editing: false });
  }

  render() {
    let display;
    if (this.state.editing) {
      display = (
        <EditGoal
          changeDisplay={this.changeDisplay}
          editFunction={this.props.editFunction}
          info={this.props.info}
        />
      );
    } else {
      display = (
        <React.Fragment>
          <Button
            className="GoalCard__Button"
            onClick={() => this.props.deleteFunction(this.props.info)}
            type="button"
            classes={{ root: this.props.classes.delete }}
          >
            <DeleteIcon />
          </Button>
          <Button
            classes={{ root: this.props.classes.edit }}
            className="GoalCard__Button"
            type="button"
            onClick={() => this.setState({ editing: true })}
          >
            <EditIcon />
          </Button>
          <h2>Title:</h2>
          <p>{this.props.info.title}</p>
          <h2>Description:</h2>
          <p id="description">{this.props.info.description}</p>
          <h2>End Date:</h2>
          <p id="end_date">{this.props.info.end_date.slice(0, 10)}</p>
        </React.Fragment>
      );
    }
    return <div className="GoalCard__container">{display}</div>;
  }
}
GoalCard.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    end_date: PropTypes.string,
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

export default withStyles(styles)(GoalCard);
