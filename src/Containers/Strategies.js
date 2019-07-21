import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';

import Api from '../Api';
import StrategyCard from '../Components/StrategyCard';
import AddButton from '../Components/AddButton';
import NoContentCard from '../Components/NoContentCard';
import ErrorCard from '../Components/ErrorCard';
import StrategyForm from '../Components/StrategyForm';

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
      body: values,
    }).then(id =>
      this.setState(prevState => ({
        ...prevState,
        strategies: [
          ...prevState.strategies,
          {
            ...values,
            id: id.id,
          },
        ],
      })),
    );
  }

  deleteStrategies(strategy) {
    if (
      window.confirm(
        `Are you sure you want to delete the strategy "${strategy.title}"?`,
      )
    ) {
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
    return Promise.resolve();
  }

  editStrategies(values, strategy) {
    return Api.request(`clients/:clientId/strategies/${strategy.id}`, {
      method: 'PATCH',
      body: values,
    }).then(() => {
      const index = this.state.strategies.findIndex(
        obj => obj.id === strategy.id,
      );
      this.setState(prevState => {
        const newStrategies = [...prevState.strategies];
        newStrategies[index] = {
          ...prevState.strategies[index],
          ...values,
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
          <div className="container_card_layout">
            {this.state.strategies.map(strategy => (
              <StrategyCard
                strategy={strategy}
                deleteFunction={this.deleteStrategies}
                editFunction={this.editStrategies}
                key={strategy.id}
              />
            ))}
          </div>
        )}
        <ErrorCard error={this.state.error} />
        <AddButton handleModal={this.handleModal} />
        <Modal open={this.state.open} onClose={this.handleModal}>
          <div className="container modal_container">
            <StrategyForm
              save={this.addStrategies}
              close={this.handleModal}
              formTitle="Create Strategy:"
              strategy={{ strategy: '', title: '' }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Strategies);
