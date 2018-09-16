import React from 'react';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

function AddStrategies(props) {
  return (
    <div className="container">
      <h2>Add Strategies Here</h2>
      <Form>
        <label htmlFor="add-strategy__strategy">
          Strategy:
          <Field id="strategy" name="strategy" value={props.values.strategy} />
        </label>
        <button type="submit" disabled={props.isSubmitting}>
          Submit
        </button>
        {props.errors.failedSubmit && <p>{props.errors.failedSubmit}</p>}
      </Form>
    </div>
  );
}
AddStrategies.propTypes = {
  values: PropTypes.shape({
    strategy: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    failedSubmit: PropTypes.string,
  }).isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    strategy: '',
  }),
  handleSubmit: (values, formikBag) =>
    formikBag.props
      .addFunction(values)
      .then(() => formikBag.setSubmitting(false))
      .catch(() =>
        formikBag.setErrors({
          failedSubmit: 'Problem submitting activity',
        })
      ),
})(AddStrategies);
