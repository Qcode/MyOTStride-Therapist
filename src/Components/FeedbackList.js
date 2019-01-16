import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

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

  render() {
    return (
      <div>
        <h2>Activity: {this.props.info.title}</h2>
        <div>
          {this.state.feedback.map(feedback => (
            <div>
              <h3>from xx/xx/xxxx </h3>
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
            </div>
          ))}
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
};

export default FeedbackList;
