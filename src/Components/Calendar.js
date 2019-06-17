import React from 'react';
import PropTypes from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: (this.props.dates || []).map(date => new Date(date)),
    };
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day),
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
    this.props.getCalendar(selectedDays);
  }

  render() {
    return (
      <div>
        <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.props.edit ? this.handleDayClick : null}
        />
      </div>
    );
  }
}
Calendar.propTypes = {
  getCalendar: PropTypes.func.isRequired,
  dates: PropTypes.arrayOf(PropTypes.string),
  edit: PropTypes.bool.isRequired,
};
Calendar.defaultProps = {
  dates: null,
};
export default Calendar;
