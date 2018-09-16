import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import PatientList from './PatientList';
import Activities from './Activities';
import Goals from './Goals';
import PatientInformation from '../Components/PatientInformation';
import Feedback from './Feedback';
import Strategies from './Strategies';

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

      <Route
        exact
        path="/patients/patientInfo/strategies"
        component={Strategies}
      />
    </div>
  );
}

export default App;
