import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

function AddActivities(props) {
  return (
    <div className="div--addItems">
      <h2>Add Activities Here</h2>
      <Formik
        initialValues={{
          title: '',
          description: '',
          endDate: '',
          startDate: '',
        }}
        onSubmit={props.addFunction}
        render={({ values, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <br />
            <label htmlFor="title">
              Title:
              <Field id="title" name="title" value={values.title} />
            </label>
            <br />
            <label htmlFor="description">
              description:
              <Field
                id="description"
                name="description"
                value={values.description}
              />
            </label>
            <br />
            <label htmlFor="startDate">
              Start Date:
              <Field id="startDate" type="date" value={values.startDate} />
            </label>
            <br />
            <label htmlFor="endDate">
              End Date:
              <Field id="endDate" type="date" value={values.endDate} />
            </label>
            <br />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      />
    </div>
  );
}
AddActivities.propTypes = {
  addFunction: PropTypes.func.isRequired,
};

export default AddActivities;
