import { createTheme } from '@mui/material';

const secondaryMain = '#F5F5F5';
const bgDefault = '#27292b';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1A304B',
    },
    secondary: {
      main: secondaryMain,
    },
    background: {
      default: bgDefault,
      paper: '#0a1525',
    },
  },
  typography: {
    body1: {
      fontSize: '1.2rem',
      fontWeight: 400,
      lineHeight: 1.25,
    },
    h1: {
      fontSize: '2.2rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: bgDefault,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: bgDefault,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          '&.Mui-focused fieldset': {
            borderColor: `${secondaryMain} !important`,
            borderWidth: '1px !important',
          },
        },
      },
    },
  },
});

export default theme;
