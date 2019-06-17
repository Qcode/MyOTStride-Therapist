import React from 'react';
import Modal from '@material-ui/core/Modal';
import { VictoryChart, VictoryLine, VictoryLegend } from 'victory';
import PropTypes from 'prop-types';

function FeedbackGraph(props) {
  const satisfactionArray = [];
  const confidenceArray = [];
  const performanceArray = [];
  let i;
  for (i = 0; i < props.feedback.length; i += 1) {
    satisfactionArray.push({
      x: `jan${i.toString()}`,
      y: props.feedback[i].satisfaction,
    });
    confidenceArray.push({
      x: `jan${i.toString()}`,
      y: props.feedback[i].confidence,
    });
    performanceArray.push({
      x: `jan${i.toString()}`,
      y: props.feedback[i].performance,
    });
  }
  return (
    <Modal open={props.open} onClose={props.handleModal}>
      <div className="container">
        <h2>Progress for Activity X</h2>
        <VictoryChart>
          <VictoryLegend
            x={320}
            y={0}
            title="Legend"
            orientation="vertical"
            gutter={20}
            style={{
              title: { fontSize: 12 },
              labels: { fontSize: 10 },
              border: { stroke: 'black' },
            }}
            data={[
              { name: 'satisfaction', symbol: { fill: '#c43a31' } },
              { name: 'confidence', symbol: { fill: '#ff8552' } },
              { name: 'performance', symbol: { fill: 'black' } },
            ]}
          />
          <VictoryLine
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' },
            }}
            data={satisfactionArray}
            domain={{ y: [0, 10] }}
          />
          <VictoryLine
            style={{
              data: { stroke: '#ff8552' },
              parent: { border: '1px solid #ccc' },
            }}
            data={confidenceArray}
            domain={{ y: [0, 10] }}
          />
          <VictoryLine
            style={{
              data: { stroke: 'black' },
              parent: { border: '1px solid #ccc' },
            }}
            data={performanceArray}
            domain={{ y: [0, 10] }}
          />
        </VictoryChart>
      </div>
    </Modal>
  );
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
