import React from 'react';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

function AddGoals(props) {
  return (
    <div className="div--addItems">
      <h2>Add Goals Here</h2>
      <Form>
        <br />
        <label htmlFor="title">
          Title:
          <Field id="title" name="title" value={props.values.title} />
        </label>
        <br />
        <label htmlFor="description">
          description:
          <Field
            id="description"
            name="description"
            value={props.values.description}
          />
        </label>
        <br />
        <label htmlFor="endDate">
          End Date:
          <Field id="endDate" type="date" value={props.values.endDate} />
        </label>
        <br />
        <button type="submit" disabled={props.isSubmitting}>
          Submit
        </button>
      </Form>
      <p>{props.error}</p>
    </div>
  );
}
AddGoals.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    title: '',
    description: '',
    endDate: '',
    startDate: '',
  }),
  handleSubmit: (values, formikBag) =>
    formikBag.props
      .addFunction(values)
      .then(() => formikBag.setSubmitting(false))
      .catch(() =>
        formikBag.setErrors({ failedSubmit: 'Problem adding goal' })
      ),
})(AddGoals);
