import { Grid } from '@mui/material';
import { GoogleSearchBar } from 'components';

export default function App() {
  return (
    <Grid
      container
      maxWidth="1920px"
      height="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <GoogleSearchBar />
      </Grid>
    </Grid>
  );
}
