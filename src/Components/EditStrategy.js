import React from 'react';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

function EditStrategy(props) {
  return (
    <div className="container">
      <h2>Edit Strategy Here</h2>
      <Form>
        <label htmlFor={`edit-strategy__strategy-${props.info.id}`}>
          Strategy:
          <Field
            id={`edit-strategy__strategy-${props.info.id}`}
            name="strategy"
            value={props.values.strategy}
          />
        </label>
        <button type="submit" disabled={props.isSubmitting}>
          Submit
        </button>
        {props.errors.failedSubmit && <p>{props.errors.failedSubmit}</p>}
      </Form>
    </div>
  );
}
EditStrategy.propTypes = {
  values: PropTypes.shape({
    strategy: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    failedSubmit: PropTypes.string,
  }).isRequired,
  info: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default withFormik({
  mapPropsToValues: props => ({
    strategy: props.info.strategy,
  }),
  handleSubmit: (values, formikBag) =>
    formikBag.props
      .editFunction(formikBag.props.info, values)
      .catch(() =>
        formikBag.setErrors({
          failedSubmit: 'Problem submitting activity',
        }),
      )
      .finally(() => formikBag.setSubmitting(false)),
})(EditStrategy);
