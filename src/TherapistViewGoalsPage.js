import React from 'react';
import { withRouter } from 'react-router-dom';
import ItemsList from './ItemsList';
import Api from './Api';
import AddItems from './AddItems';

class TherapistViewGoalsPage extends React.Component {
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
              end_date: `${values.year}-${values.month}-${values.day}`,
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
        <h1> goals</h1>
        <ItemsList
          type="goals"
          error={this.state.error === '' ? 'error' : ''}
          patientInfo={this.state.goals}
        />
        <AddItems addFunction={this.addGoals} />
      </div>
    );
  }
}

export default withRouter(TherapistViewGoalsPage);
