import React from 'react';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

function AddActivity(props) {
  return (
    <div className="container">
      <h2>Add Activities Here</h2>
      <Form>
        <label htmlFor="add-activity__title">
          Title:
          <Field
            id="add-activity__title"
            name="title"
            value={props.values.title}
          />
        </label>
        <label htmlFor="add-activity__description">
          description:
          <Field
            id="add-activity__description"
            name="description"
            value={props.values.description}
          />
        </label>
        <label htmlFor="add-activity__start-date">
          Start Date:
          <Field
            id="add-activity__start-date"
            name="startDate"
            type="date"
            value={props.values.startDate}
          />
        </label>
        <label htmlFor="add-activity__end-date">
          End Date:
          <Field
            id="add-activity__end-date"
            name="endDate"
            type="date"
            value={props.values.endDate}
          />
        </label>
        <button type="submit" disabled={props.isSubmitting}>
          Submit
        </button>
        {props.errors.failedSubmit && <p>{props.errors.failedSubmit}</p>}
      </Form>
    </div>
  );
}

AddActivity.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    failedSubmit: PropTypes.string,
  }).isRequired,
};

export default withFormik({
  handleSubmit: (values, formikBag) =>
    formikBag.props.addFunction(values).catch(() =>
      formikBag.setErrors({
        failedSubmit: 'Problem submitting activity',
      })
    ),
})(AddActivity);
