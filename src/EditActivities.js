import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

function EditActivities(props) {
  return (
    <div>
      <Formik
        initialValues={{
          title: props.info.title,
          description: props.info.description,
          endDate: props.info.endDate,
          startDate: props.info.startDate,
        }}
        onSubmit={(formValues, actions) =>
          props.editFunction({ ...formValues, id: props.info.id }, actions)
        }
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
      <p>{props.error === null ? '' : 'error'}</p>
    </div>
  );
}
EditActivities.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  error: PropTypes.string,
  editFunction: PropTypes.func.isRequired,
};
EditActivities.defaultProps = {
  error: null,
};
export default EditActivities;
