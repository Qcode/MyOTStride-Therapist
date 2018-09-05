import React from 'react';
import { withRouter } from 'react-router-dom';

import ActivitiesList from './ActivitiesList';
import Api from './Api';
import AddActivities from './AddActivities';

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [], error: '' };
    this.fetchActivities();
    this.addActivities = this.addActivities.bind(this);
    this.deleteActivities = this.deleteActivities.bind(this);
  }

  fetchActivities() {
    Api.request(`clients/:clientId/activities`)
      .then(jsonData => this.setState({ activities: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  addActivities(values, actions) {
    Api.request('clients/:clientId/activities', {
      method: 'POST',
      body: {
        title: values.title,
        description: values.description,
        dates: [values.endDate, values.startDate],
      },
    })
      .then(info => {
        actions.setSubmitting(false);
        this.setState(prevState => ({
          ...prevState,
          activities: [
            ...prevState.activities,
            {
              title: values.title,
              description: values.description,
              dates: [values.endDate, values.startDate],
              id: info.id,
            },
          ],
        }));
      })
      .catch(err => this.setState({ error: err }));
  }

  deleteActivities(info) {
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

  render() {
    return (
      <div>
        <h1>Activities</h1>
        <ActivitiesList
          error={this.state.error === null ? null : 'error'}
          patientInfo={this.state.activities}
          deleteFunction={this.deleteActivities}
        />
        <AddActivities addFunction={this.addActivities} />
      </div>
    );
  }
}

export default withRouter(Activities);
