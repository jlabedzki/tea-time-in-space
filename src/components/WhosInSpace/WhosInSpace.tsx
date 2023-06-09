import {
  Close,
  ExpandLessOutlined,
  ExpandMoreOutlined,
  Instagram,
  Twitter,
  OpenInNew,
  ErrorOutline,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';
import { StyledButton } from '../../App';
import { useWhosInSpace, Astronaut } from 'hooks';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexGrow: 1,
  minHeight: '50px',
  padding: theme.spacing(2),
}));

export default function WhosInSpace() {
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      {modalOpen && (
        <WhosInSpaceModal modalOpen={modalOpen} closeModal={closeModal} />
      )}
      <StyledButton onClick={openModal}>Who's in space?</StyledButton>
    </>
  );
}

function WhosInSpaceModal(props: {
  modalOpen: boolean;
  closeModal: () => void;
}) {
  const { modalOpen, closeModal } = props;
  const { astronauts, loading, isError } = useWhosInSpace();

  return (
    <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="md">
      {!isError ? (
        <>
          {loading ? (
            <Box width="100%" display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <DialogTitle>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontSize="1.5rem" fontWeight={500} mr={5}>
                    People currently in space: {astronauts?.length}*
                  </Typography>
                  <IconButton onClick={closeModal} aria-label="close">
                    <Close color="secondary" />
                  </IconButton>{' '}
                </Stack>
                <Typography fontSize="0.85rem">*Updated weekly</Typography>
              </DialogTitle>
              <DialogContent>
                <Stack gap={2}>
                  {astronauts?.map((astronaut) => (
                    <AstronautCard key={astronaut.id} astronaut={astronaut} />
                  ))}
                </Stack>
              </DialogContent>
            </>
          )}
        </>
      ) : (
        <DialogTitle>
          <Stack direction="row" columnGap={2} alignItems="center">
            <ErrorOutline color="error" />
            <Typography>Whoops! Something went wrong :(</Typography>
            <IconButton
              onClick={closeModal}
              aria-label="close"
              sx={{ ml: 'auto' }}
            >
              <Close color="secondary" />
            </IconButton>
          </Stack>
        </DialogTitle>
      )}
    </Dialog>
  );
}

function AstronautCard({ astronaut }: { astronaut: Astronaut }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledCard key={astronaut.id}>
      <Stack direction="row" gap={3}>
        <Avatar
          variant="rounded"
          src={astronaut.profile_image_thumbnail ?? ''}
          alt={astronaut.name}
          sx={{
            width: '80px',
            height: '80px',
          }}
        />
        <Stack rowGap={1}>
          <Stack direction="row" columnGap={1}>
            <Link
              color="#4cabff"
              href={
                astronaut.wiki ??
                `https://www.google.com/search?${new URLSearchParams({
                  q: astronaut.name,
                }).toString()}`
              }
              target="_blank"
              underline="none"
              sx={{ mr: 2 }}
            >
              <Stack direction="row" alignItems="center">
                <Typography mr={1}>{astronaut.name}</Typography>
                <OpenInNew />
              </Stack>
            </Link>
            {astronaut.instagram && (
              <Link color="#fff" href={astronaut.instagram} target="_blank">
                <Instagram />
              </Link>
            )}
            {astronaut.twitter && (
              <Link color="#fff" href={astronaut.twitter} target="_blank">
                <Twitter />
              </Link>
            )}
          </Stack>
          <Stack direction="row" columnGap={3}>
            <Stack rowGap={0.5}>
              <Typography fontSize="0.85rem">
                Age: {astronaut.age ?? 'N/A'}
              </Typography>
              <Typography fontSize="0.85rem">
                Born:{' '}
                {astronaut.date_of_birth
                  ? new Date(astronaut.date_of_birth).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'N/A'}
              </Typography>
            </Stack>
            <Stack rowGap={0.5}>
              <Typography fontSize="0.85rem">
                Nationality: {astronaut.nationality}
              </Typography>
              <Typography fontSize="0.85rem">
                Time in space: {getNumberOfDays(astronaut.time_in_space)} days
              </Typography>
            </Stack>
            <Stack rowGap={0.5}>
              <Typography fontSize="0.85rem">
                First flight:{' '}
                {astronaut.first_flight
                  ? new Date(astronaut.first_flight).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'N/A'}
              </Typography>
              <Typography fontSize="0.85rem">
                Space walks: {astronaut.spacewalks_count ?? 0}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <IconButton
          aria-label="expand info"
          sx={{ color: 'white', ml: 'auto', alignSelf: 'center' }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        </IconButton>
      </Stack>
      <Collapse in={expanded} unmountOnExit>
        <Typography textAlign="justify" pt={2}>
          {astronaut.bio}
        </Typography>
      </Collapse>
    </StyledCard>
  );
}

const getNumberOfDays = (durationString: string) => {
  const match = durationString.match(/(\d+)D/);
  if (!match || match.length < 2) {
    return 0; // Duration does not contain days
  }
  return parseInt(match[1]);
};
