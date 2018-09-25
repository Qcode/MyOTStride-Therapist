import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field, Form } from 'formik';

function EditGoal(props) {
  return (
    <div>
      <Form>
        <label htmlFor="title">
          Title:
          <Field
            id="title"
            name="title"
            placeholder="title"
            value={props.values.title}
          />
        </label>
        <label htmlFor="description">
          description:
          <Field
            id="description"
            name="description"
            placeholder="description"
            value={props.values.description}
          />
        </label>
        <label htmlFor="endDate">
          End Date:
          <Field
            id="endDate"
            name="endDate"
            type="date"
            value={props.values.endDate}
          />
        </label>
        <button type="submit" disabled={props.isSubmitting}>
          Submit
        </button>
      </Form>
      <p>{props.error === null ? '' : 'error'}</p>
    </div>
  );
}
EditGoal.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  error: PropTypes.string,
  isSubmitting: PropTypes.bool.isRequired,
};
EditGoal.defaultProps = {
  error: null,
};
export default withFormik({
  mapPropsToValues: props => ({
    title: props.info.title,
    description: props.info.description,
    endDate: props.info.endDate,
  }),
  handleSubmit: (values, formikBag) =>
    formikBag.props
      .editFunction(formikBag.props.info, values)
      .catch(() =>
        formikBag.setErrors({
          failedSubmit: 'Problem submitting goal',
        }),
      )
      .finally(() => formikBag.setSubmitting(false)),
})(EditGoal);
