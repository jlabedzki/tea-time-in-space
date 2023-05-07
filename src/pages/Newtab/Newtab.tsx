import { FormControl, IconButton, Grid, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function Newtab() {
  return (
    <Grid
      container
      height="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <FormControl>
        <TextField
          placeholder="Search Google or type a URL"
          InputProps={{
            startAdornment: (
              <IconButton>
                <SearchOutlinedIcon />
              </IconButton>
            ),
          }}
        />
      </FormControl>
    </Grid>
  );
}
