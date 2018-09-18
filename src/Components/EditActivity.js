import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field } from 'formik';
import Calendar from './Calendar';

class EditActivity extends React.Component {
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
      <div>
        <h1> Edit Activity Here</h1>
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
          <Calendar
            getCalendar={this.getCalendar}
            dates={this.props.values.dates}
          />
          <button type="submit" disabled={this.props.isSubmitting}>
            Submit
          </button>
        </Form>
      </div>
    );
  }
}
EditActivity.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setValues: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: props => ({
    title: props.info.title,
    description: props.info.description,
    dates: props.info.dates,
  }),
  handleSubmit: (values, formikBag) =>
    formikBag.props
      .editFunction(formikBag.props.info, values)
      .then(() => formikBag.setSubmitting(false))
      .catch(() =>
        formikBag.setErrors({
          failedSubmit: 'Problem editing activity',
        })
      ),
})(EditActivity);
