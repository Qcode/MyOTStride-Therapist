import React from 'react';
import { withFormik, Form } from 'formik';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Calendar from './Calendar';
import GetErrorCodeText from '../utils/GetErrorCodeText';
import GetErrorText from '../utils/GetErrorText';

class AddActivity extends React.Component {
  constructor(props) {
    super(props);
    this.getCalendar = this.getCalendar.bind(this);
  }

  getCalendar(selectedDays) {
    this.props.setValues({
      ...this.props.values,
      selectedDays,
    });
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.handleModal}>
        <div className="container">
          <h2>Add Activities Here</h2>
          <Form>
            <TextField
              label="Title"
              onChange={this.props.handleChange}
              value={this.props.values.title}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              placeholder="New Title"
              name="title"
            />
            <TextField
              label=""
              onChange={this.props.handleChange}
              value={this.props.values.description}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              placeholder="New Description"
              name="description"
              multiline
              rows="4"
            />
            <Calendar getCalendar={this.getCalendar} edit />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={this.props.isSubmitting}
            >
              Submit
            </Button>
            {this.props.errors.failedSubmit && (
              <p>{this.props.errors.failedSubmit}</p>
            )}
          </Form>
        </div>
      </Modal>
    );
  }
}

AddActivity.propTypes = {
  values: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setValues: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    failedSubmit: PropTypes.string,
  }).isRequired,
  handleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    description: '',
    title: '',
    selectedDays: '',
  }),
  handleSubmit: (values, formikBag) => {
    if (
      values.title !== '' &&
      values.title !== null &&
      values.description !== '' &&
      values.description !== null &&
      values.selectedDays !== '' &&
      values.selectedDays !== null
    ) {
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
})(AddActivity);
