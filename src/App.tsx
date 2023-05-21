import { Button, ButtonProps, Grid, Stack, styled } from '@mui/material';
import {
  APOD,
  GoogleSearchBar,
  ISSSpotter,
  MarsPhotos,
  SpaceFactOTD,
  WhosInSpace,
} from 'components';

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  flexDirection: 'column',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
  position: 'relative',
  gap: theme.spacing(5),
  padding: theme.spacing(3),
}));

export default function App() {
  return (
    <StyledGridContainer container>
      <Grid item></Grid>
      <Grid item container direction="column" width="inherit" spacing={5}>
        <Grid item display="flex" justifyContent="center" width="inherit">
          <GoogleSearchBar />
        </Grid>
        <Grid item>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            columnGap={5}
            rowGap={3}
          >
            <APOD />
            <ISSSpotter />
            {/* <MarsPhotos /> */}
            <WhosInSpace />
          </Stack>
        </Grid>
      </Grid>
      <Grid item width="inerhit" maxWidth="1200px">
        <SpaceFactOTD />
      </Grid>
    </StyledGridContainer>
  );
}

export function StyledButton(props: ButtonProps) {
  return (
    <Button
      variant="outlined"
      color="secondary"
      size="large"
      sx={{ fontSize: '1.2rem', minWidth: 'max-content' }}
      {...props}
    >
      {props.children}
    </Button>
  );
}
