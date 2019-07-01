import React from 'react';
import { withFormik, Form } from 'formik';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import GetErrorCodeText from '../utils/GetErrorCodeText';
import GetErrorText from '../utils/GetErrorText';

function AddStrategy(props) {
  return (
    <Modal open={props.open} onClose={props.handleModal}>
      <div className="container">
        <h2>Add Strategy Here</h2>
        <Form>
          <TextField
            label="Strategy"
            onChange={props.handleChange}
            value={props.values.strategy}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            placeholder="Improved Strategy"
            name="strategy"
            multiline
            rows="4"
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={props.isSubmitting}
          >
            Submit
          </Button>
          {props.errors.failedSubmit && <p>{props.errors.failedSubmit}</p>}
        </Form>
      </div>
    </Modal>
  );
}
AddStrategy.propTypes = {
  values: PropTypes.shape({
    strategy: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    failedSubmit: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    strategy: '',
  }),
  handleSubmit: (values, formikBag) => {
    if (values.strategy !== '' && values.strategy !== null) {
      formikBag.props
        .addFunction(values)
        .then(() => formikBag.props.handleModal())
        .catch(err =>
          formikBag.setErrors({
            failedSubmit: GetErrorCodeText(err),
          }),
        )
        .finally(() => {
          formikBag.setSubmitting(false);
        });
    } else {
      formikBag.setErrors({
        failedSubmit: GetErrorText('unfilledFields'),
      });
      formikBag.setSubmitting(false);
    }
  },
})(AddStrategy);
