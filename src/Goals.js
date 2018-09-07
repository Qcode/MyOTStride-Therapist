import React from 'react';
import { withRouter } from 'react-router-dom';
import GoalsList from './GoalsList';
import Api from './Api';
import AddGoals from './AddGoals';

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      error: '',
    };
    this.fetchGoals();
    this.addGoal = this.addGoal.bind(this);
  }

  fetchGoals() {
    Api.request(`clients/:clientId/goals`)
      .then(jsonData => this.setState({ goals: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  addGoal(values) {
    Api.request('clients/:clientId/goals', {
      method: 'POST',
      body: {
        title: values.title,
        description: values.description,
        end_date: `${values.year}-${values.month}-${values.day}`,
      },
    })
      .then(id =>
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
        }))
      )
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div>
        <h1>Goals</h1>
        <GoalsList
          error={this.state.error === '' ? '' : 'error'}
          goals={this.state.goals}
        />
        <AddGoals
          addFunction={this.addGoal}
          error={this.state.error === '' ? '' : 'error'}
        />
      </div>
    );
  }
}

export default withRouter(Goals);
