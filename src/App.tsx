import { Button, ButtonProps, Stack, styled, Box } from '@mui/material';
import {
  APOD,
  GoogleSearchBar,
  ISSSpotter,
  SpaceFactOTD,
  WhosInSpace,
} from 'components';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  position: 'relative',
  gap: theme.spacing(5),
  padding: theme.spacing(3),
}));

export default function App() {
  return (
    <Container>
      <Box
        sx={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <GoogleSearchBar />
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
          <WhosInSpace />
        </Stack>
      </Box>
      <Box width="inerhit" maxWidth="1200px">
        <SpaceFactOTD />
      </Box>
    </Container>
  );
}

export function StyledButton(props: ButtonProps) {
  return (
    <Button
      variant="outlined"
      color="secondary"
      size="large"
      sx={{ fontSize: '1rem', minWidth: 'max-content' }}
      {...props}
    >
      {props.children}
    </Button>
  );
}
