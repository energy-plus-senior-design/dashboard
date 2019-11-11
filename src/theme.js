import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#231651',
    },
    secondary: {
      main: '#D6FFF6',
    },
    error: {
      main: '#FF8484',
    },
    background: {
      default: '#fafafa',
    },
  },
});

export default theme;
