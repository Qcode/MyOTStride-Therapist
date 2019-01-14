import React from 'react';
import Modal from '@material-ui/core/Modal';
import { VictoryChart, VictoryLine } from 'victory';
import PropTypes from 'prop-types';

function FeedbackGraph(props) {
  return (
    <Modal open={props.open} onClose={props.handleModal}>
      <div className="container">
        <h2>Progress for Activity X</h2>
        <VictoryChart>
          <VictoryLine
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' },
            }}
            data={[
              { x: 'jan 1', y: 2 },
              { x: 'jan 2', y: 3 },
              { x: 'jan 3', y: 5 },
              { x: 'jan 4', y: 4 },
              { x: 'jan 5', y: 7 },
            ]}
          />
          <VictoryLine
            style={{
              data: { stroke: '#ff8552' },
              parent: { border: '1px solid #ccc' },
            }}
            data={[
              { x: 'jan 1', y: 8 },
              { x: 'jan 2', y: 4 },
              { x: 'jan 3', y: 3 },
              { x: 'jan 4', y: 4 },
              { x: 'jan 5', y: 9 },
            ]}
          />
        </VictoryChart>
      </div>
    </Modal>
  );
}

FeedbackGraph.propTypes = {
  open: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default FeedbackGraph;
