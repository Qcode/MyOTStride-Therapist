import React from 'react';
import PropTypes from 'prop-types';
import './Legend.css';

function Legend(props) {
  return (
    <div className="legend">
      <h5 className="text-legendTitle">LEGEND</h5>
      <h6
        onClick={() => props.hideLine('satisfaction')}
        className="text-satisfaction"
      >
        Satisfaction
      </h6>
      <h6
        onClick={() => props.hideLine('performance')}
        className="text-performance"
      >
        Progress Towards Goal
      </h6>
      <h6
        onClick={() => props.hideLine('confidence')}
        className="text-confidence"
      >
        Confidence
      </h6>
    </div>
  );
}

Legend.propTypes = {
  hideLine: PropTypes.func.isRequired,
};

export default Legend;
