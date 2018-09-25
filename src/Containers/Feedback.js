import React from 'react';
import { withRouter } from 'react-router-dom';

import Api from '../Api';

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
    let activities;
    Api.request('/clients/:clientId/activities')
      .then(activityData => {
        activities = activityData;
        return Promise.all(
          activityData.map(activity =>
            Api.request(
              `/clients/:clientId/activities/${activity.id}/feedback`,
            ),
          ),
        );
      })
      .then(feedbackArray => {
        feedbackArray.forEach(feedback => {
          this.setState(prevState => {
            const newActivityList = { ...prevState.activityList };
            if (feedback.length > 0) {
              newActivityList[feedback[0].activity_id] = {
                ...activities.find(
                  activity => activity.id === feedback[0].activity_id,
                ),
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
            <h1>Activity: {this.state.activityList[id].title}</h1>
            <div>
              {this.state.activityList[id].feedback.map((feedback, index) => (
                <div>
                  <h2>Feedback {index}</h2>
                  <ul>
                    <li>Satisfaction: {feedback.satisfaction}</li>
                    <li>Performance: {feedback.performance}</li>
                    <li>Confidence: {feedback.confidence}</li>
                    <li>Response: {feedback.response}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p>{this.state.error === null ? '' : 'error'}</p>
      </div>
    );
  }
}

export default withRouter(Feedback);
