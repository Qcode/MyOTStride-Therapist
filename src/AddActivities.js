import React from 'react';
import { Formik, withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

function AddActivities(props) {
  return (
    <div className="container">
      <h2>Add Activities Here</h2>
      <Form>
        <label htmlFor="add-activities__title">
          Title:
          <Field
            id="add-activities__title"
            name="title"
            value={props.values.title}
          />
        </label>
        <label htmlFor="add-activities__description">
          description:
          <Field
            id="add-activities__description"
            name="description"
            value={props.values.description}
          />
        </label>
        <label htmlFor="add-activities__start-date">
          Start Date:
          <Field
            id="add-activities__start-date"
            name="startDate"
            type="date"
            value={props.values.startDate}
          />
        </label>
        <label htmlFor="add-activities__end-date">
          End Date:
          <Field
            id="add-activities__end-date"
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

AddActivities.propTypes = {
  addFunction: PropTypes.func.isRequired,
};

export default withFormik({
  handleSubmit: (values, formikBag) =>
    formikBag.props.addFunction(values).catch(err =>
      formikBag.setErrors({
        failedSubmit: 'Problem submitting activity',
      }),
    ),
})(AddActivities);
