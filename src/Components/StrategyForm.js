import React from 'react';
import { withFormik, Form } from 'formik';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GetErrorText from '../utils/GetErrorText';
import GetErrorCodeText from '../utils/GetErrorCodeText';

function StrategyForm(props) {
  return (
    <div>
      <h2>{props.formTitle}</h2>
      <Form>
        <TextField
          label="Title"
          onChange={props.handleChange}
          value={props.values.title}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          placeholder="Strategy Title"
          name="title"
        />
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
          onClick={() => props.close()}
        >
          Cancel
        </Button>
        {props.errors.failedSubmit && <p>{props.errors.failedSubmit}</p>}
      </Form>
    </div>
  );
}

StrategyForm.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    strategy: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    failedSubmit: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: props => ({
    title: props.strategy.title,
    strategy: props.strategy.strategy,
  }),
  handleSubmit: (values, formikBag) => {
    if (values.strategy && values.title) {
      formikBag.props
        .save(values, formikBag.props.strategy)
        .then(() => formikBag.props.close())
        .catch(err =>
          formikBag.setErrors({
            failedSubmit: GetErrorCodeText(err),
          }),
        )
        .finally(() => {
          formikBag.setSubmitting(false);
        });
    } else {
      formikBag.setErrors({
        failedSubmit: GetErrorText('unfilledFields'),
      });
      formikBag.setSubmitting(false);
    }
  },
})(StrategyForm);
