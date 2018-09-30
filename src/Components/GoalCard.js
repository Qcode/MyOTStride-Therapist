import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import EditGoal from './EditGoal';

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
        <div>
          <h1>{this.props.info.title}</h1>
          <h1>{this.props.info.description}</h1>
          <h1>{this.props.info.end_date}</h1>
        </div>
      );
    }
    return (
      <div>
        {display}
        <Button
          onClick={() => this.props.deleteFunction(this.props.info)}
          type="button"
        >
          <DeleteIcon fontSize="large" />
        </Button>
        <Button type="button" onClick={() => this.setState({ editing: true })}>
          <EditIcon />
        </Button>
      </div>
    );
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
};

export default GoalCard;
