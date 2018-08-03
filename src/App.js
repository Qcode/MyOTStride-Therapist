import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import LoginPage from './LoginPage'


class App extends React.Component {
  render() {
    return (
      <LoginPage/>
    );
  }
}

export default App;
