import React from 'react';
import { withRouter } from 'react-router-dom';

import ItemsList from './ItemsList';
import Api from './Api';
import AddItems from './AddItems';

class TherapistViewActivitiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [], error: '' };
    this.fetchActivities();
    this.addActivities = this.addActivities.bind(this);
  }

  fetchActivities() {
    Api.request(`clients/:clientId/activities`)
      .then(jsonData => this.setState({ activities: jsonData }))
      .catch(err => this.setState({ error: err }));
  }

  addActivities(values) {
    console.log(values.title, values.description, [
      values.day,
      values.month,
      values.year,
    ]);
    Api.request('clients/:clientId/activities', {
      method: 'POST',
      body: {
        title: values.title,
        description: values.description,
        dates: [`${values.year}-${values.month}-${values.day}`],
      },
    })
      .then(id =>
        this.setState(prevState => ({
          ...prevState,
          activities: [
            ...prevState.activities,
            {
              title: values.title,
              description: values.description,
              dates: [`${values.year}-${values.month}-${values.day}`],
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
        <h1> activities</h1>
        <ItemsList
          type="activities"
          error={this.state.error === null ? 'error' : null}
          patientInfo={this.state.activities}
        />
        <AddItems addFunction={this.addActivities} />
      </div>
    );
  }
}

export default withRouter(TherapistViewActivitiesPage);
