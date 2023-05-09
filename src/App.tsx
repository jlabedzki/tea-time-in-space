import {
  Button,
  Grid,
  Stack,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { GoogleSearchBar, SpaceFactOTD } from 'components';

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  position: 'relative',
  gap: theme.spacing(3),
  padding: theme.spacing(3),
}));

export default function App() {
  const md = useTheme().breakpoints.values.md;
  const isSmallScreen = useMediaQuery(`(max-width: ${md}px)`);

  return (
    <StyledGridContainer container>
      <Grid
        item
        sx={{
          position: 'absolute',
          padding: 'inherit',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'inherit',
          maxWidth: '1200px',
        }}
      >
        <SpaceFactOTD />
      </Grid>
      <Grid item width="100%" display="flex" justifyContent="center">
        <GoogleSearchBar />
      </Grid>
      <Grid item width="100%">
        <Stack
          direction={isSmallScreen ? 'column' : 'row'}
          justifyContent="center"
          alignItems="center"
          columnGap={5}
          rowGap={3}
        >
          <Button variant="contained" sx={{ width: 'fit-content' }}>
            APOD
          </Button>
          <Button variant="contained" sx={{ width: 'fit-content' }}>
            ISS SPOTTER
          </Button>
          <Button variant="contained" sx={{ width: 'fit-content' }}>
            MARS PHOTOS
          </Button>
          <Button variant="contained" sx={{ width: 'fit-content' }}>
            WHO'S IN SPACE?
          </Button>
        </Stack>
      </Grid>
      <Grid
        item
        sx={{
          position: 'absolute',
          padding: 'inherit',
          bottom: 0,
          right: 0,
        }}
      >
        <Button>help</Button>
      </Grid>
    </StyledGridContainer>
  );
}
