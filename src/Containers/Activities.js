import React from 'react';
import { withRouter } from 'react-router-dom';

import ActivityCard from '../Components/ActivityCard';
import Api from '../Api';
import AddActivity from '../Components/AddActivity';
import AddButton from '../Components/AddButton';
import ErrorCard from '../Components/ErrorCard';
import NoContentCard from '../Components/NoContentCard';

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      error: null,
      open: false,
    };
    this.fetchActivities();
    this.addActivity = this.addActivity.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
    this.handleModal = this.handleModal.bind(this);
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
    }).then(info => {
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
    });
  }

  deleteActivity(info) {
    if (
      window.confirm(
        `Are you sure you want to delete the activity "${info.title}"?`,
      )
    ) {
      return Api.request(`clients/:clientId/activities/${info.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          const activities = this.state.activities.filter(
            i => i.id !== info.id,
          );
          this.setState(prevState => ({
            ...prevState,
            activities,
          }));
        })
        .catch(err => this.setState({ error: err }));
    }
    return Promise.resolve();
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

  handleModal() {
    this.setState(prevState => ({
      ...prevState,
      open: !prevState.open,
    }));
  }

  render() {
    return (
      <div>
        <h1>Activities</h1>
        {(this.state.activities.length === 0 && this.state.error === null) ||
        (this.state.activities === undefined && this.state.error === null) ? (
          <NoContentCard type="activities" />
        ) : (
          this.state.activities.map(info => (
            <ActivityCard
              key={info.id}
              editFunction={this.editActivity}
              info={info}
              deleteFunction={this.deleteActivity}
            />
          ))
        )}
        <AddActivity
          addFunction={this.addActivity}
          handleModal={this.handleModal}
          open={this.state.open}
        />
        <AddButton handleModal={this.handleModal} />
        <ErrorCard error={this.state.error} />
      </div>
    );
  }
}

export default withRouter(Activities);
