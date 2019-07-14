import React from 'react';
import { Route } from 'react-router-dom';
import Api from '../Api';
import Login from './Login';
import PatientList from './PatientList';
import Activities from './Activities';
import Goals from './Goals';
import PatientInformation from '../Components/PatientInformation';
import Strategies from './Strategies';
import AuthenticatedRoute from './AuthenticatedRoute';
import SignUp from './SignUp';
import Header from '../Components/Header';
import Privacy from '../Components/Privacy';
import Contact from '../Components/Contact';
import FeedbackGraph from '../Components/FeedbackGraph';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Route
          exact
          path="/"
          component={Api.isLoggedIn() ? AuthenticatedRoute(PatientList) : Login}
        />

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

        <Route
          exact
          path="/patients/patientInfo/activities/feedbackGraph"
          component={AuthenticatedRoute(FeedbackGraph)}
        />
      </div>
    </div>
  );
}

export default App;
