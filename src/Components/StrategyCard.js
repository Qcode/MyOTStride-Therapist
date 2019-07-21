import React from 'react';
import PropTypes from 'prop-types';
import CardTitle from './CardTitle';
import { withStyles } from '@material-ui/core/styles';
import StrategyForm from './StrategyForm';

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

class StrategyCard extends React.Component {
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
    return (
      <div className="container container_card">
        {this.state.editing ? (
          <StrategyForm
            close={this.changeDisplay}
            save={this.props.editFunction}
            strategy={this.props.strategy}
            formTitle="Edit Strategy:"
          />
        ) : (
          <React.Fragment>
            <CardTitle
              delete={() => this.props.deleteFunction(this.props.strategy)}
              edit={() => this.setState({ editing: true })}
              title={this.props.strategy.title}
            />
            <p>{this.props.strategy.strategy}</p>
          </React.Fragment>
        )}
      </div>
    );
  }
}
StrategyCard.propTypes = {
  info: PropTypes.shape({
    strategy: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  editFunction: PropTypes.func.isRequired,
  deleteFunction: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    delete: PropTypes.string,
    edit: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(StrategyCard);
