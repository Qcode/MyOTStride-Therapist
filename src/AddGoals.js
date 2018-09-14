import React from 'react';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

function AddGoals(props) {
  return (
    <div className="div--addItems">
      <h2>Add Goals Here</h2>
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
        <label htmlFor="endDate">
          End Date:
          <Field id="endDate" type="date" value={props.values.endDate} />
        </label>
        <button type="submit" disabled={props.isSubmitting}>
          Submit
        </button>
      </Form>
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
