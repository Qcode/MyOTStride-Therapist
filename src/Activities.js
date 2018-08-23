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
  }

  fetchActivities() {
    Api.request(`clients/:clientId/activities`)
      .then(jsonData => this.setState({ activities: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  addActivities(values) {
    Api.request('clients/:clientId/activities', {
      method: 'POST',
      body: {
        title: values.title,
        description: values.description,
        dates: [values.endDate, values.startDate],
      },
    })
      .then(id =>
        this.setState(prevState => ({
          ...prevState,
          activities: [
            ...prevState.activities,
            {
              title: values.title,
              description: values.description,
              dates: [values.endDate, values.startDate],
              id,
            },
          ],
        }))
      )
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div>
        <h1> activities</h1>
        <ActivitiesList
          error={this.state.error === null ? null : 'error'}
          patientInfo={this.state.activities}
        />
        <AddActivities addFunction={this.addActivities} />
      </div>
    );
  }
}

export default withRouter(Activities);
