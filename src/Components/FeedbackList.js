import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import DropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom';
import Api from '../Api';
import './FeedbackList.css';

class FeedbackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: [],
      error: null,
    };
    this.getFeedback();
    this.seeFeedback = this.seeFeedback.bind(this);
  }

  getFeedback() {
    Api.request(`/clients/:clientId/activities/${this.props.info.id}/feedback`)
      .then(feedback => {
        this.setState({
          feedback: feedback.sort((a, b) => {
            const aDate = new Date(a.created_at);
            const bDate = new Date(b.created_at);
            return aDate.getTime() < bDate.getTime() ? 1 : -1;
          }),
        });
      })
      .catch(err => this.setState({ error: err }));
  }

  seeFeedback(feedbackId) {
    this.setState(prevState => {
      const newFeedback = prevState.feedback.map(
        feedback =>
          feedback.id === feedbackId ? { ...feedback, seen: true } : feedback,
      );
      return { ...prevState, feedback: newFeedback };
    });
    Api.request(
      `/clients/:clientId/activities/${
        this.props.info.id
      }/feedback/${feedbackId}`,
      { method: 'PATCH', body: { seen: true } },
    );
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
        <h2>{this.props.info.title}</h2>
        <div>
          {this.state.feedback.map(feedback => (
            <div key={feedback.id} className="feedback__container">
              <Collapsible
                trigger={
                  <div className="feedback__collapsible-container">
                    <h3 className="feedback__collapsible-title">
                      {feedback.created_at.slice(0, 10)}
                    </h3>
                    <DropDownIcon
                      className="feedback__collapsible-icon"
                      fontSize="large"
                    />
                    {!feedback.seen ? (
                      <div className="feedback__collapsible-unseen">!</div>
                    ) : null}
                  </div>
                }
                onOpen={() => this.seeFeedback(feedback.id)}
                transitionTime={250}
                easing="ease"
              >
                <Button
                  onClick={() => this.deleteFeedback(feedback.id)}
                  type="button"
                >
                  <DeleteIcon />
                </Button>
                <p>
                  <b>Satisfaction</b>: {feedback.satisfaction}
                </p>
                <p>
                  <b>Progress Towards Goal</b>: {feedback.performance}
                </p>
                <p>
                  <b>Confidence</b>: {feedback.confidence}
                </p>
                <p>
                  <b>Response</b>: {feedback.response}
                </p>
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
            View Graph
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
