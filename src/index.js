import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';
import Theme from './Theme';

ReactDOM.render(
  <MuiThemeProvider theme={Theme}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
