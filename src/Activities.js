import React from 'react';
import { withRouter } from 'react-router-dom';

import ActivitiesList from './ActivitiesList';
import Api from './Api';
import AddActivities from './AddActivities';

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [], error: null };
    this.fetchActivities();
    this.addActivity = this.addActivity.bind(this);
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
        dates: [values.endDate, values.startDate],
      },
    }).then(id =>
      this.setState(prevState => ({
        ...prevState,
        activities: [
          ...prevState.activities,
          {
            title: values.title,
            description: values.description,
            dates: [values.endDate, values.startDate],
            id: id.id,
          },
        ],
      })),
    );
  }

  render() {
    return (
      <div>
        <h1>Activities</h1>
        <ActivitiesList activities={this.state.activities} />
        <AddActivities addFunction={this.addActivity} />
        {this.state.error !== null ? <p>Error Fetching Activities</p> : null}
      </div>
    );
  }
}

export default withRouter(Activities);
