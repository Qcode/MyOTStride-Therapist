import React from 'react';
import PropTypes from 'prop-types';
import EditStrategy from './EditStrategy';

function StrategiesList(props) {
  return (
    <div>
      {props.strategies.map(info => (
        <div key={info.id} className="container">
          <h1> {info.strategy}</h1>
          <button onClick={() => props.deleteFunction(info)} type="button">
            {' '}
            delete
          </button>
          <EditStrategy editFunction={props.editFunction} info={info} />
        </div>
      ))}
    </div>
  );
}

StrategiesList.propTypes = {
  strategies: PropTypes.arrayOf(
    PropTypes.shape({
      strategy: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  editFunction: PropTypes.func.isRequired,
};

export default StrategiesList;
