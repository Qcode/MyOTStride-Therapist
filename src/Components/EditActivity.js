import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Calendar from './Calendar';

class EditActivity extends React.Component {
  constructor(props) {
    super(props);
    this.getCalendar = this.getCalendar.bind(this);
  }

  getCalendar(selectedDays) {
    this.props.setValues({
      ...this.props.values,
      selectedDays,
    });
  }

  render() {
    return (
      <div>
        <h2>Edit Activity Here</h2>
        <Form>
          <TextField
            label="Title"
            onChange={this.props.handleChange}
            value={this.props.values.title}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            placeholder="Improved Title"
            name="title"
          />
          <TextField
            label="Description"
            onChange={this.props.handleChange}
            value={this.props.values.description}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            placeholder="Improved Description"
            name="description"
            multiline
            rows="4"
          />
          <Calendar
            getCalendar={this.getCalendar}
            dates={this.props.values.dates}
            edit = {true}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={this.props.isSubmitting}
          >
            Submit
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.props.changeDisplay()}
          >
            Cancel
          </Button>
        </Form>
      </div>
    );
  }
}
EditActivity.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setValues: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  changeDisplay: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: props => ({
    title: props.info.title,
    description: props.info.description,
    dates: props.info.dates,
  }),
  handleSubmit: (values, formikBag) =>
    formikBag.props
      .editFunction(formikBag.props.info, values)
      .catch(() =>
        formikBag.setErrors({
          failedSubmit: 'Problem editing activity',
        }),
      )
      .finally(() => {
        formikBag.setSubmitting(false);
        formikBag.props.changeDisplay();
      }),
})(EditActivity);
