import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import './PatientInformation.css';

function PatientInformation(props) {
  return (
    <div className="container patient-information__container">
      <Button
        onClick={props.downloadFile}
        className="patient-information__download"
      >
        <DownloadIcon />
      </Button>
      <h2>{`${props.patient.first_name} ${props.patient.last_name}`}</h2>

      <Button
        color="primary"
        variant="contained"
        type="button"
        onClick={() => {
          props.pickClient(props.patient.id);
          props.history.push('/patients/patientInfo/activities');
        }}
      >
        View Activities
      </Button>
      <Button
        color="primary"
        variant="contained"
        type="button"
        onClick={() => {
          props.pickClient(props.patient.id);
          props.history.push('/patients/patientInfo/goals');
        }}
      >
        View Goals
      </Button>
      <Button
        color="primary"
        variant="contained"
        type="button"
        onClick={() => {
          props.pickClient(props.patient.id);
          props.history.push('/patients/patientInfo/strategies');
        }}
      >
        View Strategies
      </Button>
    </div>
  );
}

PatientInformation.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func, goBack: PropTypes.func })
    .isRequired,
  pickClient: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};
PatientInformation.defaultProps = {
  patient: null,
};

export default withRouter(PatientInformation);
