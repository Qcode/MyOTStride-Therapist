import React from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryTooltip,
  VictoryZoomContainer,
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
      x: new Date(feedback.created_at),
      y: feedback[rating],
      label: new Date(feedback.created_at)
        .toLocaleString()
        .slice(0, 10)
        .replace(',', ''),
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
      <div className="container" style={{ width: '80%', 'margin-top': '20px' }}>
        {this.props.location.state.feedback.length === 0 ||
        this.props.location.state.feedback === [] ? (
          <p>The client has not submitted any feedback.</p>
        ) : (
          <React.Fragment>
            <h2>Progress for {this.props.location.state.title}</h2>
            <Legend hideLine={this.hideLine} />
            <VictoryChart
              scale={{ x: 'time' }}
              containerComponent={<VictoryZoomContainer zoomDimension="x" />}
            >
              {this.state.satisfactionVisible ? (
                <VictoryChart>
                  <VictoryLine
                    style={{
                      data: { stroke: '#c43a31' },
                      parent: { border: '1px solid #ccc' },
                    }}
                    data={FeedbackGraph.sortFeedbackDates(
                      this.props.location.state.feedback,
                      'satisfaction',
                    )}
                    domain={{ y: [0, 10] }}
                    labelComponent={<VictoryTooltip />}
                  />
                  <VictoryScatter
                    style={{ data: { fill: '#c43a31' } }}
                    size={3}
                    data={FeedbackGraph.sortFeedbackDates(
                      this.props.location.state.feedback,
                      'satisfaction',
                    )}
                    domain={{ y: [0, 10] }}
                    labelComponent={<VictoryTooltip />}
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
                      this.props.location.state.feedback,
                      'confidence',
                    )}
                    domain={{ y: [0, 10] }}
                    labelComponent={<VictoryTooltip />}
                  />
                  <VictoryScatter
                    style={{ data: { fill: '#ff8552' } }}
                    size={3}
                    data={FeedbackGraph.sortFeedbackDates(
                      this.props.location.state.feedback,
                      'confidence',
                    )}
                    domain={{ y: [0, 10] }}
                    labelComponent={<VictoryTooltip />}
                  />
                </VictoryChart>
              ) : null}
              {this.state.performanceVisible ? (
                <VictoryChart>
                  <VictoryLine
                    style={{
                      data: { stroke: 'purple' },
                      parent: { border: '1px solid #ccc' },
                    }}
                    data={FeedbackGraph.sortFeedbackDates(
                      this.props.location.state.feedback,
                      'performance',
                    )}
                    domain={{ y: [0, 10] }}
                    labelComponent={<VictoryTooltip />}
                  />
                  <VictoryScatter
                    style={{ data: { fill: 'purple' } }}
                    size={3}
                    data={FeedbackGraph.sortFeedbackDates(
                      this.props.location.state.feedback,
                      'performance',
                    )}
                    domain={{ y: [0, 10] }}
                    labelComponent={<VictoryTooltip />}
                  />
                </VictoryChart>
              ) : null}
              <VictoryAxis label="Date/Time" />
              <VictoryAxis dependentAxis label="Rating" />
            </VictoryChart>
          </React.Fragment>
        )}
      </div>
    );
  }
}

FeedbackGraph.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      feedback: PropTypes.arrayOf(
        PropTypes.shape({
          confidence: PropTypes.string,
          performance: PropTypes.string,
          satisfaction: PropTypes.string,
          dates: PropTypes.arrayOf(PropTypes.string),
        }),
      ),
      title: PropTypes.string,
    }),
  }),
};
FeedbackGraph.defaultProps = {
  location: null,
};

export default FeedbackGraph;
