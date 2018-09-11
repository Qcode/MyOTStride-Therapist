import React from 'react';
import { withRouter } from 'react-router-dom';

import Api from '../Api';
import AddStrategies from '../Components/AddStrategies';
import StrategiesList from '../Components/StrategiesList';

class Strategies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strategies: [],
      error: null,
    };
    this.fetchStrategies();
    this.addStrategies = this.addStrategies.bind(this);
    this.editStrategies = this.editStrategies.bind(this);
    this.deleteStrategies = this.deleteStrategies.bind(this);
  }

  fetchStrategies() {
    Api.request('clients/:clientId/strategies')
      .then(jsonData => this.setState({ strategies: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  addStrategies(values) {
    return Api.request('clients/:clientId/strategies', {
      method: 'POST',
      body: {
        strategy: values.strategy,
      },
    }).then(id =>
      this.setState(prevState => ({
        ...prevState,
        strategies: [
          ...prevState.strategies,
          {
            strategy: values.strategy,
            id: id.id,
          },
        ],
      }))
    );
  }

  deleteStrategies(strategy) {
    return Api.request(`clients/:clientId/strategies/${strategy.id}`, {
      method: 'DELETE',
    }).then(() => {
      const strategies = this.state.strategies.filter(
        obj => obj.id !== strategy.id
      );
      this.setState(prevState => ({
        ...prevState,
        strategies,
      }));
    });
  }

  editStrategies(strategy, values) {
    return Api.request(`clients/:clientId/strategies/${strategy.id}`, {
      method: 'PATCH',
      body: {
        strategy: values.strategy,
      },
    }).then(() => {
      const index = this.state.strategies.findIndex(
        obj => obj.id === strategy.id
      );
      this.setState(prevState => {
        const newStrategies = [...prevState.strategies];
        newStrategies[index] = {
          ...prevState.strategies[index],
          strategy: values.strategy,
        };
        return {
          ...prevState,
          strategies: newStrategies,
        };
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Strategies</h1>
        <StrategiesList
          strategies={this.state.strategies}
          deleteFunction={this.deleteStrategies}
          editFunction={this.editStrategies}
        />
        <AddStrategies addFunction={this.addStrategies} />
      </div>
    );
  }
}

export default withRouter(Strategies);
