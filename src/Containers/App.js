import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import PatientList from './PatientList';
import Activities from './Activities';
import Goals from './Goals';
import PatientInformation from '../Components/PatientInformation';
import Strategies from './Strategies';
import AuthenticatedRoute from './AuthenticatedRoute';
import SignUp from './SignUp';
import TopNavBar from '../Components/TopNavBar';
import Privacy from '../Components/Privacy';
import Contact from '../Components/Contact';

function App() {
  return (
    <div>
      <TopNavBar />
      <div>
        <Route exact path="/" component={Login} />

        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/contact" component={Contact} />

        <Route
          exact
          path="/patients"
          component={AuthenticatedRoute(PatientList)}
        />

        <Route exact path="/signup" component={SignUp} />

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
          path="/patients/patientInfo/strategies"
          component={AuthenticatedRoute(Strategies)}
        />
      </div>
    </div>
  );
}

export default App;
