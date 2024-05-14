import { createTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const palette = {
  mode: 'dark',
  background: {
    default: '#242424',
  },
  text: {
    primary: "#e2e2e2",
  },
};

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      }
    },
    MuiButtonGroup: {
      defaultProps: {
        disableRipple: true,
      }
    },
    MuiLink: {
      defaultProps: {
        component: RouterLink,
      },
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  overrides: {
    MuiInputBase: {
      input: {
        background: "#000",
      },
    },
  },
  palette,
});

export default theme;
