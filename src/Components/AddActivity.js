import React from 'react';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import Calendar from './Calendar';

class AddActivities extends React.Component {
  constructor(props) {
    super(props);
    this.getCalendar = this.getCalendar.bind(this);
  }

  getCalendar(selectedDays) {
    this.props.setValues({
      ...this.props.values,
      selectedDays: selectedDays.selectedDays,
    });
  }

  render() {
    return (
      <div className="container">
        <h2>Add Activities Here</h2>
        <Form>
          <label htmlFor="add-activity__title">
            Title:
            <Field
              id="add-activity__title"
              name="title"
              value={this.props.values.title}
            />
          </label>
          <label htmlFor="add-activity__description">
            description:
            <Field
              id="add-activity__description"
              name="description"
              value={this.props.values.description}
            />
          </label>
          <Calendar getCalendar={this.getCalendar} />
          <button type="submit" disabled={this.props.isSubmitting}>
            Submit
          </button>
          {this.props.errors.failedSubmit && (
            <p>{this.props.errors.failedSubmit}</p>
          )}
        </Form>
      </div>
    );
  }
}

AddActivities.propTypes = {
  values: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setValues: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    failedSubmit: PropTypes.string,
  }).isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    description: '',
    title: '',
    dates: '',
  }),
  handleSubmit: (values, formikBag) =>
    formikBag.props
      .addFunction(values)
      .then(() => formikBag.setSubmitting(false))
      .catch(() =>
        formikBag.setErrors({
          failedSubmit: 'Problem submitting activity',
        })
      ),
})(AddActivity);

