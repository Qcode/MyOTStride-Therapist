import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import PatientList from './PatientList';
import Activities from './Activities';
import Goals from './Goals';
import PatientInformation from './PatientInformation';
import Feedback from './Feedback';

function App() {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/patients" component={PatientList} />
      <Route
        exact
        path="/patients/patientInfo"
        component={PatientInformation}
      />

      <Route
        exact
        path="/patients/patientInfo/activities"
        component={Activities}
      />
      <Route exact path="/patients/patientInfo/goals" component={Goals} />

      <Route exact path="/patients/patientInfo/feedback" component={Feedback} />
    </div>
  );
}

export default App;
