import { createTheme } from '@mui/material';

const darkGray = '#27292b';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1A304B',
    },
    secondary: {
      main: '#F5F5F5',
    },
    background: {
      default: darkGray,
      paper: '#0a1525',
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: darkGray,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: darkGray,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          '&.Mui-focused fieldset': {
            borderColor: '#F5F5F5 !important',
            borderWidth: '1px !important',
          },
        },
      },
    },
  },
});

export default theme;
