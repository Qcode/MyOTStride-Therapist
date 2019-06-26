import React from 'react';
import Modal from '@material-ui/core/Modal';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryLabel,
} from 'victory';
import PropTypes from 'prop-types';
import Legend from './Legend';

class FeedbackGraph extends React.Component {
  static sortFeedbackDates(Feedback, rating) {
    const sortedFeedback = Feedback.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
    const graphData = sortedFeedback.map(feedback => ({
      x: new Date(feedback.created_at).toLocaleString('en-CA', {
        timeZone: 'GMT',
      }),
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
        <div className="container">
          {this.props.feedback.length === 0 || this.props.feedback === [] ? (
            <p>The client has not submitted any feedback.</p>
          ) : (
            <React.Fragment>
              <h2>Progress for {this.props.title}</h2>
              <VictoryChart>
                {this.state.satisfactionVisible ? (
                  <VictoryChart>
                    <VictoryLine
                      style={{
                        data: { stroke: '#c43a31' },
                        parent: { border: '1px solid #ccc' },
                      }}
                      data={FeedbackGraph.sortFeedbackDates(
                        this.props.feedback,
                        'satisfaction',
                      )}
                      domain={{ y: [0, 10] }}
                    />
                    <VictoryScatter
                      style={{ data: { fill: '#c43a31' } }}
                      size={3}
                      data={FeedbackGraph.sortFeedbackDates(
                        this.props.feedback,
                        'satisfaction',
                      )}
                      domain={{ y: [0, 10] }}
                    />
                    <VictoryAxis
                      tickLabelComponent={
                        <VictoryLabel
                          textAnchor="start"
                          style={{ fontSize: 10 }}
                          angle={69}
                        />
                      }
                    />
                  </VictoryChart>
                ) : null}
                {this.state.confidenceVisible ? (
                  <VictoryChart>
                    <VictoryLine
                      style={{
                        data: { stroke: '#ff8552' },
                        parent: { border: '1px solid #ccc' },
                      }}
                      data={FeedbackGraph.sortFeedbackDates(
                        this.props.feedback,
                        'confidence',
                      )}
                      domain={{ y: [0, 10] }}
                    />
                    <VictoryScatter
                      style={{ data: { fill: '#ff8552' } }}
                      size={3}
                      data={FeedbackGraph.sortFeedbackDates(
                        this.props.feedback,
                        'confidence',
                      )}
                      domain={{ y: [0, 10] }}
                    />
                    <VictoryAxis
                      tickLabelComponent={
                        <VictoryLabel
                          textAnchor="start"
                          style={{ fontSize: 10 }}
                          angle={69}
                        />
                      }
                    />
                  </VictoryChart>
                ) : null}
                {this.state.performanceVisible ? (
                  <VictoryChart>
                    <VictoryLine
                      style={{
                        data: { stroke: 'black' },
                        parent: { border: '1px solid #ccc' },
                      }}
                      data={FeedbackGraph.sortFeedbackDates(
                        this.props.feedback,
                        'performance',
                      )}
                      domain={{ y: [0, 10] }}
                    />
                    <VictoryScatter
                      style={{ data: { fill: 'black' } }}
                      size={3}
                      data={FeedbackGraph.sortFeedbackDates(
                        this.props.feedback,
                        'performance',
                      )}
                      domain={{ y: [0, 10] }}
                    />
                    <VictoryAxis
                      tickLabelComponent={
                        <VictoryLabel
                          textAnchor="start"
                          style={{ fontSize: 10 }}
                          angle={69}
                        />
                      }
                    />
                  </VictoryChart>
                ) : null}
                <VictoryAxis
                  label="Date"
                  tickLabelComponent={
                    <VictoryLabel
                      textAnchor="start"
                      style={{ fontSize: 10 }}
                      angle={69}
                    />
                  }
                />
                <VictoryAxis dependentAxis label="Rating" />
              </VictoryChart>
              <Legend hideLine={this.hideLine} />
            </React.Fragment>
          )}
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
  title: PropTypes.string,
};
FeedbackGraph.defaultProps = {
  feedback: null,
  title: null,
};

export default FeedbackGraph;
