import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#2A83BF',
    },
    secondary: {
      main: '#d19000',
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
    MuiSvgIcon: {
      root: {
        'vertical-align': 'middle',
      },
    },
  },
});
