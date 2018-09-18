import React from 'react';
import PropTypes from 'prop-types';
import EditActivity from './EditActivity';

function ActivitiesList(props) {
  return (
    <div>
      {props.activities.map(info => (
        <div key={info.id} className="container">
          <h1> {info.title}</h1>
          <h1>{info.description}</h1>
          <button onClick={() => props.deleteFunction(info)} type="button">
            {' '}
            delete
          </button>
          <EditActivity
            editFunction={props.editFunction}
            info={info}
            error={props.error}
          />
        </div>
      ))}

      {props.error && <p>Error</p>}
    </div>
  );
}

ActivitiesList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.string,
  editFunction: PropTypes.func.isRequired,
};
ActivitiesList.defaultProps = {
  error: null,
};

export default ActivitiesList;
