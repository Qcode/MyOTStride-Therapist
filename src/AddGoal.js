import React from 'react';
import { Formik, withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

function AddGoal(props) {
  return (
    <div className="container">
      <h2>Add Goals Here</h2>
      <Form>
        <label htmlFor="add-goal__title">
          Title:
          <Field id="add-goal__title" name="title" value={props.values.title} />
        </label>
        <label htmlFor="add-goal__description">
          description:
          <Field
            id="add-goal__description"
            name="description"
            value={props.values.description}
          />
        </label>
        <label htmlFor="add-goal__end-date">
          End Date:
          <Field
            name="endDate"
            id="add-goal__end-date"
            type="date"
            value={props.values.endDate}
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

AddGoal.propTypes = {
  addFunction: PropTypes.func.isRequired,
};

export default withFormik({
  handleSubmit: (values, formikBag) => {
    console.log(values);

    formikBag.props.addFunction(values).catch(err =>
      formikBag.setErrors({
        failedSubmit: 'Problem adding goal',
      }),
    );
  },
})(AddGoal);
