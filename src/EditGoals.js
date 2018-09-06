import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';

function EditGoals(props) {
  return (
    <div>
      <Formik
        initialValues={{
          title: props.info.title,
          description: props.info.description,
          endDate: props.info.endDate,
        }}
        onSubmit={(formValues, actions) =>
          props.editFunction({ ...formValues, id: props.info.id }, actions)
        }
        render={({ values, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <br />
            <label htmlFor="title">
              <Field
                id="title"
                name="title"
                placeholder="title"
                value={values.title}
              />
              Title:
            </label>
            <br />
            <label htmlFor="description">
              <Field
                id="description"
                name="description"
                placeholder="description"
                value={values.description}
              />
              description:
            </label>
            <br />
            <label htmlFor="endDate">
              <Field id="endDate" type="date" value={values.endDate} />
              End Date:
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
EditGoals.propTypes = {
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
EditGoals.defaultProps = {
  error: null,
};
export default EditGoals;
