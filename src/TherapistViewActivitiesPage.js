import React from 'react';
import { withRouter } from 'react-router-dom';

import GoalsList from './GoalsList';
import Api from './Api';

class TherapistViewActivitiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [], error: '' };
    this.fetchActivities();
  }

  fetchActivities() {
    Api.request(`clients/:clientId/activities`)
      .then(jsonData => this.setState({ activities: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div>
        <h1> activities</h1>
        <GoalsList
          type="activities"
          error={this.state.error === null ? 'error' : null}
          patientInfo={this.state.activities}
        />
      </div>
    );
  }
}

export default withRouter(TherapistViewActivitiesPage);
