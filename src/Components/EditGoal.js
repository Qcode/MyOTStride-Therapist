import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './EditGoal.css';

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
          placeholder="New Goal"
          name="title"
        />
        <TextField
          label="Description"
          onChange={props.handleChange}
          value={props.values.description}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          placeholder="New Description"
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
        <Button type="submit" disabled={props.isSubmitting} color="primary" variant="contained">
          Submit
        </Button>
        <Button
          type="button"
          color ="primary"
          variant="contained"
          onClick={()=>props.changeDisplay()}
        >
          Cancel
        </Button>
      </Form>
      <p>{props.error === null ? null : 'error'}</p>
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
  info: PropTypes.shape({
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
      .finally(() => {
        formikBag.setSubmitting(false);
        formikBag.props.changeDisplay();
      }),
})(EditGoal);
