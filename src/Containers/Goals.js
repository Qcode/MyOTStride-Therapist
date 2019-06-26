import React from 'react';
import { withRouter } from 'react-router-dom';
import Api from '../Api';
import AddGoal from '../Components/AddGoal';
import GoalCard from '../Components/GoalCard';
import AddButton from '../Components/AddButton';
import NoContentCard from '../Components/NoContentCard';
import ErrorCard from '../Components/ErrorCard';

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      error: null,
      open: false,
    };
    this.fetchGoals();
    this.addGoal = this.addGoal.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.editGoal = this.editGoal.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  fetchGoals() {
    Api.request('clients/:clientId/goals/all')
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
            id: id.id,
          },
        ],
      })),
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
        end_date: values.endDate,
      },
    }).then(() => {
      const index = this.state.goals.findIndex(obj => obj.id === info.id);
      this.setState(prevState => {
        const newGoals = [...prevState.goals];
        newGoals[index] = {
          ...prevState.goals[index],
          title: values.title,
          description: values.description,
          end_date: values.endDate,
        };
        return {
          ...prevState,
          goals: newGoals,
        };
      });
    });
  }

  handleModal() {
    this.setState(prevState => ({
      ...prevState,
      open: !prevState.open,
    }));
  }

  render() {
    return (
      <div>
        <h1>Goals</h1>
        {(this.state.goals.length === 0 && this.state.error === null) ||
        (this.state.goals === undefined && this.state.error === null) ? (
          <NoContentCard type="goals" />
        ) : (
          this.state.goals.map(info => (
            <GoalCard
              key={info.id}
              info={info}
              editFunction={this.editGoal}
              deleteFunction={this.deleteGoal}
            />
          ))
        )}
        <AddGoal
          addFunction={this.addGoal}
          error={this.state.error === '' ? '' : 'error'}
          handleModal={this.handleModal}
          open={this.state.open}
        />
        <AddButton handleModal={this.handleModal} />
        {this.state.error !== null ? (
          <ErrorCard error={this.state.error} />
        ) : null}
      </div>
    );
  }
}
export default withRouter(Goals);
