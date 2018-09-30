import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette:{
    primary:{
      main:"#00a388",
    },
    secondary:{
      main:"#ff8552",
    },
  },
  overrides: {
    MuiNotchedOutline: {
      focused: {
        "border-color": "#ff8552"
      }
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#ff8552"
        }
      }
    }
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
