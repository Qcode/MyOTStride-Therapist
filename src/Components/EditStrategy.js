import React from 'react';
import { withFormik, Form } from 'formik';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function EditStrategy(props) {
  return (
    <div>
      <h2>Edit Strategy Here</h2>
      <Form>
        <TextField
          label="Strategy"
          onChange={props.handleChange}
          value={props.values.strategy}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          placeholder="Improved Strategy"
          name="strategy"
          multiline
          rows="4"
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={props.isSubmitting}
        >
          Submit
        </Button>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={() => props.changeDisplay()}
        >
          Cancel
        </Button>
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
  handleChange: PropTypes.func.isRequired,
  changeDisplay: PropTypes.func.isRequired,
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
      .finally(() => {
        formikBag.setSubmitting(false);
        formikBag.props.changeDisplay();
      }),
})(EditStrategy);
