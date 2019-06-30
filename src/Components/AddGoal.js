import React from 'react';
import { withFormik, Form } from 'formik';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import GetErrorCodeText from '../utils/GetErrorCodeText';
import GetErrorText from '../utils/GetErrorText';

function AddGoal(props) {
  return (
    <Modal open={props.open} onClose={props.handleModal}>
      <div className="container">
        <h2>Add Goals Here</h2>
        <Form>
          <TextField
            label="Title"
            onChange={props.handleChange}
            value={props.values.title}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            placeholder="New Goal"
            name="title"
          />
          <TextField
            label="Description"
            onChange={props.handleChange}
            value={props.values.description}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            placeholder="New Description"
            name="description"
          />
          <TextField
            label="End Date"
            onChange={props.handleChange}
            value={props.values.endDate}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            name="endDate"
            type="date"
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

AddGoal.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    failedSubmit: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    title: '',
    description: '',
    endDate: '',
  }),
  handleSubmit: (values, formikBag) => {
    if (
      values.title !== '' &&
      values.title !== null &&
      values.description !== '' &&
      values.description !== null &&
      values.endDate !== '' &&
      values.endDate !== null
    ) {
      formikBag.props
        .addFunction(values)
        .catch(err =>
          formikBag.setErrors({
            failedSubmit: GetErrorCodeText(err),
          }),
        )
        .finally(() => {
          formikBag.setSubmitting(false);
          formikBag.props.handleModal();
        });
    } else {
      formikBag.setErrors({
        failedSubmit: GetErrorText('unfilledFields'),
      });
      formikBag.setSubmitting(false);
    }
  },
})(AddGoal);
