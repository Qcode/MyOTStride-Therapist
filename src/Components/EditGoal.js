import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GetErrorText from '../utils/GetErrorText';
import GetErrorCodeText from '../utils/GetErrorCodeText';

function EditGoal(props) {
  return (
    <div>
      <Form>
        <TextField
          label="Title"
          onChange={props.handleChange}
          value={props.values.title}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          placeholder="Improved Goal"
          name="title"
        />
        <TextField
          label="Description"
          onChange={props.handleChange}
          value={props.values.description}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          placeholder="Improved Description"
          name="description"
          multiline
          rows="4"
        />
        <TextField
          label="End Date"
          onChange={props.handleChange}
          value={props.values.endDate}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          name="endDate"
          type="date"
        />
        <Button
          type="submit"
          disabled={props.isSubmitting}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={props.changeDisplay}
        >
          Cancel
        </Button>
      </Form>
      {props.errors.failedSubmit && <p>{props.errors.failedSubmit}</p>}
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
  errors: PropTypes.shape({
    failedSubmit: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  changeDisplay: PropTypes.func.isRequired,
};
EditGoal.defaultProps = {
  errors: null,
};
export default withFormik({
  mapPropsToValues: props => ({
    title: props.info.title,
    description: props.info.description,
    endDate: props.info.end_date.slice(0, 10),
  }),
  handleSubmit: (values, formikBag) => {
    if (
      values.title !== '' &&
      values.title !== null &&
      values.description !== '' &&
      values.description !== null &&
      values.endDate !== '' &&
      values.endDate !== null
    ) {
      formikBag.props
        .editFunction(formikBag.props.info, values)
        .then(() => formikBag.props.changeDisplay())
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
})(EditGoal);
