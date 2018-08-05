import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import LoginPage from './LoginPage'
import PatientListPage from './PatientListPage'


class App extends React.Component {
  render() {
    return (
      <div>
        <Route path="/PatientlistPage" component={PatientListPage} />
        <Route path='/LoginPage' component={LoginPage}/>
      <LoginPage/>
      </div>
    );
  }
}

export default App;
