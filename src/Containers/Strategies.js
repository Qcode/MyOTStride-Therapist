import React from 'react';
import { withRouter } from 'react-router-dom';

import Api from '../Api';
import AddStrategy from '../Components/AddStrategy';
import StrategyCard from '../Components/StrategyCard';
import AddButton from '../Components/AddButton';
import NoContentCard from '../Components/NoContentCard';
import ErrorCard from '../Components/ErrorCard';

class Strategies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strategies: [],
      error: null,
      open: false,
    };
    this.fetchStrategies();
    this.addStrategies = this.addStrategies.bind(this);
    this.editStrategies = this.editStrategies.bind(this);
    this.deleteStrategies = this.deleteStrategies.bind(this);
    this.handleModal = this.handleModal.bind(this);
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
      })),
    );
  }

  deleteStrategies(strategy) {
    return Api.request(`clients/:clientId/strategies/${strategy.id}`, {
      method: 'DELETE',
    }).then(() => {
      const strategies = this.state.strategies.filter(
        obj => obj.id !== strategy.id,
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
        obj => obj.id === strategy.id,
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

  handleModal() {
    this.setState(prevState => ({
      ...prevState,
      open: !prevState.open,
    }));
  }

  render() {
    return (
      <div>
        <h1>Strategies</h1>
        {(this.state.strategies.length === 0 && this.state.error === null) ||
        (this.state.strategies === undefined && this.state.error === null) ? (
          <NoContentCard type="strategies" />
        ) : (
          this.state.strategies.map(info => (
            <StrategyCard
              info={info}
              deleteFunction={this.deleteStrategies}
              editFunction={this.editStrategies}
              key={info.id}
            />
          ))
        )}
        {this.state.error ===null?null:<ErrorCard error ={this.state.error}/>}
        <AddButton handleModal={this.handleModal} />
        <AddStrategy
          addFunction={this.addStrategies}
          handleModal={this.handleModal}
          open={this.state.open}
        />
      </div>
    );
  }
}

export default withRouter(Strategies);
