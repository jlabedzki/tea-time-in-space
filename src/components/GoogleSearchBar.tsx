import { FormControl, IconButton, TextField, useTheme } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

export default function GoogleSearchBar() {
  const theme = useTheme();
  return (
    <FormControl
      sx={{
        [theme.breakpoints.down('sm')]: {
          width: '400px',
        },
        width: '550px',
      }}
    >
      <TextField
        fullWidth
        placeholder="Search Google or type a URL"
        color="primary"
        autoComplete="off"
        sx={{
          borderRadius: '30px',
          background: theme.palette.secondary.main,
        }}
        InputProps={{
          startAdornment: (
            <IconButton>
              <SearchOutlined />
            </IconButton>
          ),
        }}
      />
    </FormControl>
  );
}
