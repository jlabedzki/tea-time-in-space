import {
  Button,
  ButtonBaseProps,
  ButtonProps,
  Grid,
  Stack,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  AOTD,
  GoogleSearchBar,
  ISSSpotter,
  MarsPhotos,
  SpaceFactOTD,
  WhosInSpace,
} from 'components';

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  position: 'relative',
  gap: theme.spacing(5),
  padding: theme.spacing(3),
}));

export default function App() {
  const md = useTheme().breakpoints.values.md;
  const isSmallScreen = useMediaQuery(`(max-width: ${md}px)`);

  return (
    <StyledGridContainer container>
      <Grid item width="inherit" display="flex" justifyContent="center">
        <GoogleSearchBar />
      </Grid>
      <Grid item width="inherit">
        <Stack
          direction={isSmallScreen ? 'column' : 'row'}
          justifyContent="center"
          alignItems="center"
          columnGap={5}
          rowGap={3}
        >
          <AOTD />
          <ISSSpotter />
          <MarsPhotos />
          <WhosInSpace />
        </Stack>
      </Grid>
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
    </StyledGridContainer>
  );
}

export function StyledButton(props: ButtonProps) {
  return (
    <Button
      variant="outlined"
      color="secondary"
      size="large"
      sx={{ fontSize: '1.2rem' }}
      {...props}
    >
      {props.children}
    </Button>
  );
}
