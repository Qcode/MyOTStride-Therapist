import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import PatientList from './PatientList';
import Activities from './Activities';
import Goals from './Goals';
import PatientInformation from '../Components/PatientInformation';
import Feedback from './Feedback';
import Strategies from './Strategies';
import AuthenticatedRoute from './AuthenticatedRoute';

function App() {
  return (
    <div>
      <Route exact path="/" component={Login} />

      <Route
        exact
        path="/patients"
        component={AuthenticatedRoute(PatientList)}
      />

      <Route
        exact
        path="/patients/patientInfo"
        component={AuthenticatedRoute(PatientInformation)}
      />

      <Route
        exact
        path="/patients/patientInfo/activities"
        component={AuthenticatedRoute(Activities)}
      />

      <Route
        exact
        path="/patients/patientInfo/goals"
        component={AuthenticatedRoute(Goals)}
      />

      <Route
        exact
        path="/patients/patientInfo/feedback"
        component={AuthenticatedRoute(Feedback)}
      />

      <Route
        exact
        path="/patients/patientInfo/strategies"
        component={AuthenticatedRoute(Strategies)}
      />
    </div>
  );
}

export default App;
