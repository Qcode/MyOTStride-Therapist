import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

function AddGoals(props) {
  return (
    <div className="AddItems">
      <h2>Add Goals Here</h2>
      <Formik
        initialValues={{
          title: '',
          description: '',
          endDate: '',
          startDate: '',
        }}
        onSubmit={values => {
          props.addFunction(values);
        }}
        render={({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <br />
            <label htmlFor="title">
              Title:
              <input
                id="title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </label>
            <br />
            <label htmlFor="description">
              description:
              <input
                id="description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
            </label>
            <br />
            <label htmlFor="startDate">
              Start Date:
              <input
                id="startDate"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.startDate}
              />
            </label>
            <br />
            <label htmlFor="endDate">
              End Date:
              <input
                id="endDate"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.endDate}
              />
            </label>
            <br />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      />
    </div>
  );
}
AddGoals.propTypes = {
  addFunction: PropTypes.func.isRequired,
};

export default AddGoals;
