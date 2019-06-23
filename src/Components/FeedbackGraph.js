import React from 'react';
import Modal from '@material-ui/core/Modal';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';
import PropTypes from 'prop-types';

class FeedbackGraph extends React.Component {
  static sortFeedbackDates(Feedback, rating) {
    const sortedFeedback = Feedback.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
    const graphData = sortedFeedback.map(feedback => ({
      x: new Date(feedback.created_at).toDateString(),
      y: feedback[rating],
    }));
    return graphData;
  }

  constructor(props) {
    super(props);
    this.state = {
      confidenceVisible: true,
      satisfactionVisible: true,
      performanceVisible: true,
    };
    this.hideLine = this.hideLine.bind(this);
  }

  hideLine(rating) {
    this.setState(prevState => ({
      [`${rating}Visible`]: !prevState[`${rating}Visible`],
    }));
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.handleModal}>
        <div className="container" style={{ flex: 1, flexDirection: 'row' }}>
          <h2>Progress for Activity X</h2>
          <VictoryChart>
            {this.state.satisfactionVisible ? (
              <VictoryLine
                style={{
                  data: { stroke: '#c43a31' },
                  parent: { border: '1px solid #ccc' },
                }}
                data={FeedbackGraph.sortFeedbackDates(
                  this.props.feedback,
                  'satisfaction',
                )}
                eventKey="satisfaction"
                domain={{ y: [0, 10] }}
                name="satisfaction"
              />
            ) : null}
            {this.state.confidenceVisible ? (
              <VictoryLine
                style={{
                  data: { stroke: '#ff8552' },
                  parent: { border: '1px solid #ccc' },
                }}
                data={FeedbackGraph.sortFeedbackDates(
                  this.props.feedback,
                  'confidence',
                )}
                eventKey="confidence"
                domain={{ y: [0, 10] }}
                name="confidence"
              />
            ) : null}
            {this.state.performanceVisible ? (
              <VictoryLine
                style={{
                  data: { stroke: 'black' },
                  parent: { border: '1px solid #ccc' },
                }}
                data={FeedbackGraph.sortFeedbackDates(
                  this.props.feedback,
                  'performance',
                )}
                eventKey="performance"
                domain={{ y: [0, 10] }}
                name="performance"
              />
            ) : null}
            <VictoryAxis label="Date" />
            <VictoryAxis dependentAxis label="Rating" />
          </VictoryChart>
          <div>
            <p onClick={() => this.hideLine('satisfaction')}>Satisfaction</p>
            <p onClick={() => this.hideLine('performance')}>
              Progress Towards Goal
            </p>
            <p onClick={() => this.hideLine('confidence')}>Confidence</p>
          </div>
        </div>
      </Modal>
    );
  }
}

FeedbackGraph.propTypes = {
  open: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  feedback: PropTypes.shape({
    satisfaction: PropTypes.string,
    confidence: PropTypes.string,
    performance: PropTypes.string,
    length: PropTypes.number,
  }),
};
FeedbackGraph.defaultProps = {
  feedback: null,
};

export default FeedbackGraph;
