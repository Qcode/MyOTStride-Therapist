import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field } from 'formik';

function EditActivities(props) {
  return (
    <div>
      <Form>
        <label htmlFor="title">
          Title:
          <Field id="title" name="title" value={props.values.title} />
        </label>
        <label htmlFor="description">
          description:
          <Field
            id="description"
            name="description"
            value={props.values.description}
          />
        </label>
        <label htmlFor="startDate">
          Start Date:
          <Field
            id="startDate"
            name="startDate"
            type="date"
            value={props.values.startDate}
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
      <p>{props.values.endDate}</p>
    </div>
  );
}
EditActivities.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
EditActivities.defaultProps = {
  error: null,
};
export default withFormik({
  mapPropsToValues: props => ({
    title: props.info.title,
    description: props.info.description,
    endDate: props.info.endDate,
    startDate: props.info.startDate,
  }),
  handleSubmit: (values, formikBag) =>
    formikBag.props
      .editFunction(formikBag.props.info, values)
      .then(() => formikBag.setSubmitting(false))
      .catch(() =>
        formikBag.setErrors({
          failedSubmit: 'Problem editing activity',
        })
      ),
})(EditActivities);
