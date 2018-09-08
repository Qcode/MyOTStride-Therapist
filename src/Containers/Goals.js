import React from 'react';
import { withRouter } from 'react-router-dom';
import GoalsList from '../Components/GoalsList';
import Api from '../Api';
import AddGoal from '../Components/AddGoal';

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      error: null,
    };
    this.fetchGoals();
    this.addGoal = this.addGoal.bind(this);
  }

  fetchGoals() {
    Api.request('clients/:clientId/goals')
      .then(jsonData => this.setState({ goals: jsonData }))
      .catch(err => this.setState({ error: 'Failed to fetch goals' }));
  }

  addGoal(values) {
    return Api.request('clients/:clientId/goals', {
      method: 'POST',
      body: {
        title: values.title,
        description: values.description,
        end_date: values.endDate,
      },
    }).then(id =>
      this.setState(prevState => ({
        ...prevState,
        goals: [
          ...prevState.goals,
          {
            title: values.title,
            description: values.description,
            end_date: values.endDate,
            id,
          },
        ],
      })),
    );
  }

  render() {
    return (
      <div>
        <h1>Goals</h1>
        <GoalsList error={this.state.error} goals={this.state.goals} />
        <AddGoal addFunction={this.addGoal} />
      </div>
    );
  }
}

export default withRouter(Goals);
