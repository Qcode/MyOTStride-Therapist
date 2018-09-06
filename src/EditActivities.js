import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';

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
