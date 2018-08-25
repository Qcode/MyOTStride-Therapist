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
    this.addGoals = this.addGoals.bind(this);
  }

  fetchGoals() {
    Api.request(`clients/:clientId/goals`)
      .then(jsonData => this.setState({ goals: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  addGoals(values) {
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
          patientInfo={this.state.goals}
        />
        <AddGoals
          addFunction={this.addGoals}
          error={this.state.error === '' ? '' : 'error'}
        />
      </div>
    );
  }
}

export default withRouter(Goals);
