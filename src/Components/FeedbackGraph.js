import React from 'react';
import Modal from '@material-ui/core/Modal';
import { VictoryChart, VictoryLine, VictoryLegend } from 'victory';
import PropTypes from 'prop-types';

class FeedbackGraph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      confidenceVisible:true,
      satisfactionVisible:true,
      performanceVisible:true,
    }
  }
  render(){
  return (
    <Modal open={this.props.open} onClose={this.props.handleModal}>
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
          {this.state.satisfactionVisible?
          <VictoryLine
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' },
            }}
            data={[1,1]}
            domain={{ y: [0, 10] }}
          />:null}
          {this.state.confidenceVisible?
          <VictoryLine
            style={{
              data: { stroke: '#ff8552' },
              parent: { border: '1px solid #ccc' },
            }}
            data={[2,2]}
            domain={{ y: [0, 10] }}
          />:null}
          {this.state.performanceVisible?
          <VictoryLine
            style={{
              data: { stroke: 'black' },
              parent: { border: '1px solid #ccc' },
            }}
            data={[3,3]}
            domain={{ y: [0, 10] }}
          />:null}
        </VictoryChart>
      </div>
    </Modal>
  )
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
