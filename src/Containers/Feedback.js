import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Api from '../Api';
import FeedbackGraph from '../Components/FeedbackGraph';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityList: {},
      error: null,
      open: false,
    };
    this.getFeedback();
    this.handleModal = this.handleModal.bind(this);
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

  handleModal() {
    this.setState(prevState => ({
      ...prevState,
      open: !prevState.open,
    }));
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.activityList).map(id => (
          <div key={id}>
            <h1>Activity: {this.state.activityList[id].title}</h1>
            <div>
              {this.state.activityList[id].feedback.map((feedback, index) => (
                <div className="container">
                  <h2>Feedback {index}</h2>
                  <ul>
                    <li>
                      <b>Satisfaction</b>: {feedback.satisfaction}
                    </li>
                    <li>
                      <b>Performance</b>: {feedback.performance}
                    </li>
                    <li>
                      <b>Confidence</b>: {feedback.confidence}
                    </li>
                    <li>
                      <b>Response</b>: {feedback.response}
                    </li>
                  </ul>
                  <FeedbackGraph
                    handleModal={this.handleModal}
                    open={this.state.open}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    type="button"
                    onClick={() => {
                      this.handleModal();
                    }}
                  >
                    View Progress
                  </Button>
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
