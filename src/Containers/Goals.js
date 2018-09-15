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
    this.deleteGoal = this.deleteGoal.bind(this);
    this.editGoal = this.editGoal.bind(this);
  }

  fetchGoals() {
    Api.request('clients/:clientId/goals')
      .then(jsonData => this.setState({ goals: jsonData }))
      .catch(() => this.setState({ error: 'Failed to fetch goals' }));
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
      }))
    );
  }

  deleteGoal(info) {
    Api.request(`clients/:clientId/goals/${info.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const goals = this.state.goals.filter(i => i.id !== info.id);
        this.setState(prevState => ({
          ...prevState,
          goals,
        }));
      })
      .catch(err => this.setState({ error: err }));
  }

  editGoal(info, values) {
    return Api.request(`clients/:clientId/goals/${info.id}`, {
      method: 'PATCH',
      body: {
        title: values.title,
        description: values.description,
        dates: [values.endDate, values.startDate],
      },
    }).then(() => {
      const index = this.state.goals.findIndex(obj => obj.id === info.id);
      this.setState(prevState => {
        const newGoals = [...prevState.goals];
        newGoals[index] = {
          ...prevState.goals[index],
          title: values.title,
          description: values.description,
          dates: values.endDate,
        };
        return {
          ...prevState,
          goals: newGoals,
        };
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Goals</h1>
        <GoalsList
          error={this.state.error === '' ? '' : 'error'}
          patientInfo={this.state.goals}
          deleteFunction={this.deleteGoal}
          editFunction={this.editGoal}
          goals={this.state.goals}
        />
        <AddGoal
          addFunction={this.addGoal}
          error={this.state.error === '' ? '' : 'error'}
        />
        {this.state.error !== null ? <p>Error Fetching Activities</p> : null}
      </div>
    );
  }
}

export default withRouter(Goals);
