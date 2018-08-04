import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import PatientListPage from './PatientListPage';

function App() {
  return (
    <div>
      <Route path="/patients" component={PatientListPage} />
      <Route exact path="/" component={LoginPage} />
    </div>
  );
}

export default App;
