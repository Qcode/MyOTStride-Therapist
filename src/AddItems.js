import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

function AddItems(props) {
  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          description: '',
          day: '',
          month: '',
          year: '',
        }}
        validate={values => {
          let errors = {};
          if (typeof values.description && typeof values.title !== 'string') {
            errors = 'Entry Required';
          }
          return errors;
        }}
        onSubmit={values => {
          props.addFunction(values);
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <p>title:</p>
            <br />
            <input
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            {touched.email && errors.email && <div>{errors.email}</div>}
            <p>description:</p>
            <br />
            <input
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            <p>day:</p>
            <br />
            <input
              name="day"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.day}
            />
            <p>month:</p>
            <br />
            <input
              name="month"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.month}
            />
            <p>year:</p>
            <input
              name="year"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.year}
            />
            {touched.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      />
    </div>
  );
}
AddItems.propTypes = {
  addFunction: PropTypes.func.isRequired,
};
export default AddItems;
