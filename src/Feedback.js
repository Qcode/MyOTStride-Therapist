import React from 'react';
import { withRouter } from 'react-router-dom';

import Api from './Api';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityList: {},
      error: null,
    };
    this.getFeedback();
  }

  getFeedback() {
    Api.request('/clients/:clientId/activities')
      .then(activityData =>
        Promise.all(
          activityData.map(activity =>
            Api.request(`/clients/:clientId/activities/${activity.id}/feedback`)
          )
        )
      )
      .then(feedbackArray => {
        feedbackArray.forEach(feedback => {
          this.setState(prevState => {
            const newActivityList = { ...prevState.activityList };
            if (feedback.length > 0) {
              newActivityList[feedback[0].activity_id] = {
                ...prevState.activityList[feedback[0].activity_id],
                feedback,
              };
            }
            return {
              ...prevState,
              activityList: newActivityList,
            };
          });
        });
      })
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.activityList).map(id => (
          <div key={id}>
            <p>
              {this.state.activityList[id].feedback.map(
                feedback =>
                  `satisfaction: ${feedback.satisfaction} performance: ${
                    feedback.performance
                  } confidence: ${feedback.confidence} feedback: ${
                    feedback.response
                  }
              `
              )}
            </p>
          </div>
        ))}
        <p>{this.state.error === null ? '' : 'error'}</p>
      </div>
    );
  }
}

export default withRouter(Feedback);
