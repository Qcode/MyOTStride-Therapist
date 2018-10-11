import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const styles = {
  add: {
    position: 'fixed',
    right: '3%',
    bottom: '5%',
    color: '#e6e6e6',
  },
};

function AddButton(props) {
  return (
    <Button
      variant="fab"
      color="secondary"
      classes={{ root: props.classes.add }}
      onClick={props.handleModal}
    >
      <AddIcon />
    </Button>
  );
}

AddButton.propTypes = {
  classes: PropTypes.shape({
    add: PropTypes.shape({
      position: PropTypes.string,
      right: PropTypes.string,
      bottom: PropTypes.string,
    }),
  }).isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddButton);
