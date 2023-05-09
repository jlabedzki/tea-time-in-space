import { FormControl, IconButton, TextField, useTheme } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

export default function GoogleSearchBar() {
  const theme = useTheme();
  return (
    <FormControl sx={{ width: '550px' }}>
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
          sx: {
            height: '45px',
          },
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
