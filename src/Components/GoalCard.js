import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import CardTitle from './CardTitle';
import EditGoal from './EditGoal';

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
          <CardTitle
            edit={() => this.setState({ editing: true })}
            delete={() => this.props.deleteFunction(this.props.info)}
            title={this.props.info.title}
          />
          <p>{this.props.info.description}</p>
          <h2>End Date:</h2>
          <p>{this.props.info.end_date.slice(0, 10)}</p>
        </React.Fragment>
      );
    }
    return <div className="container container_card">{display}</div>;
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
    delete: PropTypes.string,
    edit: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(GoalCard);
