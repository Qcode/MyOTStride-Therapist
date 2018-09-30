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
      selectedDays,
    });
  }

  render() {
    return (
      <div>
        <h1>Edit Activity Here</h1>
        <Form>
          <label htmlFor={`edit-activity__title-${this.props.info.id}`}>
            Title:
            <Field
              id={`edit-activity__title-${this.props.info.id}`}
              name="title"
              value={this.props.values.title}
            />
          </label>
          <label htmlFor={`edit-activity__description-${this.props.info.id}`}>
            description:
            <Field
              id={`edit-activity__description-${this.props.info.id}`}
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
      .catch(() =>
        formikBag.setErrors({
          failedSubmit: 'Problem editing activity',
        }),
      )
      .finally(() => formikBag.setSubmitting(false)),
})(EditActivity);
