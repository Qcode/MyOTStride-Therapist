import React from 'react';
import { withRouter } from 'react-router-dom';
import GoalsList from './GoalsList';
import Api from './Api';

class TherapistViewGoalsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goals: [], error: '' };
    this.fetchGoals();
  }

  fetchGoals() {
    Api.request(`clients/:clientId/goals`)
      .then(jsonData => this.setState({ goals: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div>
        <h1> goals</h1>
        <GoalsList
          type="goals"
          error={this.state.error === null ? 'error' : null}
          patientInfo={this.state.goals}
        />
      </div>
    );
  }
}

export default withRouter(TherapistViewGoalsPage);
