import React from 'react';
import { withRouter } from 'react-router-dom';

import ActivitiesList from '../Components/ActivitiesList';
import Api from '../Api';
import AddActivity from '../Components/AddActivity';

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [], error: null };
    this.fetchActivities();
    this.addActivity = this.addActivity.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
  }

  fetchActivities() {
    Api.request(`clients/:clientId/activities`)
      .then(jsonData => this.setState({ activities: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  addActivity(values) {
    return Api.request('clients/:clientId/activities', {
      method: 'POST',
      body: {
        title: values.title,
        description: values.description,
        dates: values.selectedDays,
      },
    })
      .then(info => {
        this.setState(prevState => ({
          ...prevState,
          activities: [
            ...prevState.activities,
            {
              title: values.title,
              description: values.description,
              dates: values.selectedDays,
              id: info.id,
            },
          ],
        }));
      })
      .catch(err => this.setState({ error: err }));
  }

  deleteActivity(info) {
    Api.request(`clients/:clientId/activities/${info.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const activities = this.state.activities.filter(i => i.id !== info.id);
        this.setState(prevState => ({
          ...prevState,
          activities,
        }));
      })
      .catch(err => this.setState({ error: err }));
  }

  editActivity(info, values) {
    return Api.request(`clients/:clientId/activities/${info.id}`, {
      method: 'PATCH',
      body: {
        title: values.title,
        description: values.description,
        dates: values.selectedDays,
      },
    }).then(() => {
      const index = this.state.activities.findIndex(obj => obj.id === info.id);
      this.setState(prevState => {
        const newActivities = [...prevState.activities];
        newActivities[index] = {
          ...prevState.activities[index],
          title: values.title,
          description: values.description,
          dates: values.selectedDays,
        };
        return {
          ...prevState,
          activities: newActivities,
        };
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Activities</h1>
        <ActivitiesList
          activities={this.state.activities}
          editFunction={this.editActivity}
          error={this.state.error === null ? null : 'error'}
          patientInfo={this.state.activities}
          deleteFunction={this.deleteActivity}
        />
        <AddActivity
          addFunction={this.addActivity}
          getCalendar={this.getCalendar}
        />
        {this.state.error !== null ? <p>Error Fetching Activities</p> : null}
      </div>
    );
  }
}

export default withRouter(Activities);
