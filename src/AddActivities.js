import React from 'react';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class AddActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
    };
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
    this.props.setValues({ ...this.props.values, selectedDays });
  }

  render() {
    return (
      <div className="div--addItems">
        <h2>Add Activities Here</h2>
        <Form>
          <label htmlFor="title">
            Title:
            <Field id="title" name="title" value={this.props.values.title} />
          </label>
          <label htmlFor="description">
            description:
            <Field
              id="description"
              name="description"
              value={this.props.values.description}
            />
          </label>
          <DayPicker
            selectedDays={this.state.selectedDays}
            onDayClick={this.handleDayClick}
          />
          <button type="submit" disabled={this.props.isSubmitting}>
            Submit
          </button>
        </Form>
      </div>
    );
  }
}
AddActivities.propTypes = {
  values: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setValues: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    description: '',
    title: '',
    dates: '',
  }),
  handleSubmit: (values, formikBag) =>
    formikBag.props
      .addFunction(values)
      .then(() => formikBag.setSubmitting(false))
      .catch(() =>
        formikBag.setErrors({ failedSubmit: 'Problem adding Activity' })
      ),
})(AddActivities);
