import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import PatientListPage from './PatientListPage';
import TherapistViewActivitiesPage from './TherapistViewActivitiesPage';
import TherapistViewGoalsPage from './TherapistViewGoalsPage';
import ViewPatientInformationPage from './ViewPatientInformationPage';

function App() {
  return (
    <div>
      <Route exact path="/patients" component={PatientListPage} />
      <Route
        exact
        path="/patients/patientInfo/activities"
        component={TherapistViewActivitiesPage}
      />
      <Route
        exact
        path="/patients/patientInfo/goals"
        component={TherapistViewGoalsPage}
      />
      <Route
        exact
        path="/patients/patientInfo"
        component={ViewPatientInformationPage}
      />
      <Route exact path="/" component={LoginPage} />
    </div>
  );
}

export default App;
