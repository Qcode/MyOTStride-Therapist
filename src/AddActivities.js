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
      <div className="div--addItems">
        <h2>Add Activities Here</h2>
        <Form>
          <label htmlFor="title">
            Title:
            <Field id="title" name="title" value={this.props.values.title} />
          </label>
          <label htmlFor="description">
            description:
            <Field
              id="description"
              name="description"
              value={this.props.values.description}
            />
          </label>
          <Calendar getCalendar={this.getCalendar} />
          <button type="submit" disabled={this.props.isSubmitting}>
            Submit
          </button>
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
        formikBag.setErrors({ failedSubmit: 'Problem adding Activity' })
      ),
})(AddActivities);
