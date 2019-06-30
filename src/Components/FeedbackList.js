import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';

import Api from '../Api';
import FeedbackGraph from './FeedbackGraph';

class FeedbackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: [],
      open: false,
      error: null,
    };
    this.getFeedback();
    this.handleModal = this.handleModal.bind(this);
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

  handleModal() {
    this.setState(prevState => ({
      ...prevState,
      open: !prevState.open,
    }));
  }

  render() {
    return (
      <div>
        <h2>Activity: {this.props.info.title}</h2>
        <div>
          {this.state.feedback.map(feedback => (
            <div key={feedback.id}>
              <Collapsible
                trigger={feedback.created_at.slice(0,10)}
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
          <FeedbackGraph
            handleModal={this.handleModal}
            open={this.state.open}
            feedback={this.state.feedback}
            title={this.props.info.title}
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
