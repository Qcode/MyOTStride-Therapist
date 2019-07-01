import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import { withRouter } from 'react-router-dom';

import Api from '../Api';

class FeedbackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: [],
      error: null,
    };
    this.getFeedback();
  }

  getFeedback() {
    Api.request(`/clients/:clientId/activities/${this.props.info.id}/feedback`)
      .then(feedback => {
        this.setState({ feedback });
      })
      .catch(err => this.setState({ error: err }));
  }

  deleteFeedback(feedbackId) {
    Api.request(
      `/clients/:clientId/activities/${
        this.props.info.id
      }/feedback/${feedbackId}`,
      {
        method: 'DELETE',
      },
    )
      .then(() => {
        const feedback = this.state.feedback.filter(i => i.id !== feedbackId);
        this.setState(prevState => ({
          ...prevState,
          feedback,
        }));
      })
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div>
        <h2>Activity: {this.props.info.title}</h2>
        <div>
          {this.state.feedback.map(feedback => (
            <div key={feedback.id}>
              <Collapsible
                trigger={feedback.created_at.slice(0, 10)}
                transitionTIme={100}
                triggerStyle={{ color: '#00a388', fontSize: '25px' }}
                className="Collapsible"
              >
                <p className="text">
                  <b>Satisfaction</b>: {feedback.satisfaction}
                </p>
                <p className="text">
                  <b>Performance</b>: {feedback.performance}
                </p>
                <p className="text">
                  <b>Confidence</b>: {feedback.confidence}
                </p>
                <p className="text">
                  <b>Response</b>: {feedback.response}
                </p>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.deleteFeedback(feedback.id)}
                >
                  DELETE
                </Button>
              </Collapsible>
            </div>
          ))}
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={() => {
              this.props.history.push(
                '/patients/patientInfo/activities/feedbackGraph',
                { feedback: this.state.feedback, title: this.props.info.title },
              );
            }}
          >
            View Progress
          </Button>
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => this.props.viewingFeedback()}
        >
          Go Back
        </Button>
        <p>{this.state.error === null ? '' : this.state.error}</p>
      </div>
    );
  }
}

FeedbackList.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dates: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  viewingFeedback: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func, goBack: PropTypes.func })
    .isRequired,
};

export default withRouter(FeedbackList);
