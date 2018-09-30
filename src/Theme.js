import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#00a388',
    },
    secondary: {
      main: '#ff8552',
    },
  },
  overrides: {
    MuiNotchedOutline: {
      focused: {
        'border-color': '#ff8552',
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#ff8552',
        },
      },
    },
    MuiButtonBase: {
      root: {
        margin: 'auto',
        'margin-top': '5px',
        'margin-bottom': '5px',
        display: 'block',
      },
    },
    MuiFormControl: {
      root: {
        display: 'flex',
      },
    },
  },
});
