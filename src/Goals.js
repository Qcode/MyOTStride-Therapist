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
    this.deleteGoals = this.deleteGoals.bind(this);
    this.editGoals = this.editGoals.bind(this);
  }

  fetchGoals() {
    Api.request(`clients/:clientId/goals`)
      .then(jsonData => this.setState({ goals: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  addGoals(values) {
    return Api.request('clients/:clientId/goals', {
      method: 'POST',
      body: {
        title: values.title,
        description: values.description,
        end_date: values.endDate,
      },
    })
      .then(info => {
        this.setState(prevState => ({
          ...prevState,
          goals: [
            ...prevState.goals,
            {
              title: values.title,
              description: values.description,
              end_date: values.endDate,
              id: info.id,
            },
          ],
        }));
      })
      .catch(err => this.setState({ error: err }));
  }

  deleteGoals(info) {
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

  editGoals(info, values) {
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
          deleteFunction={this.deleteGoals}
          editFunction={this.editGoals}
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
