import {
  Close,
  ExpandLessOutlined,
  ExpandMoreOutlined,
  OpenInNew,
} from '@mui/icons-material';
import {
  Avatar,
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

// TODO: update styling and add loading indicator
export default function WhosInSpace() {
  const [modalOpen, setModalOpen] = useState(false);

  const { astronauts, loading } = useWhosInSpace();

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="md">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <DialogTitle
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack gap={1}>
                <Typography fontSize="1.5rem" fontWeight={500} mr={5}>
                  People currently in space: {astronauts?.length}*
                </Typography>
                <Typography fontWeight={500}>*Updated weekly</Typography>
              </Stack>
              <IconButton onClick={closeModal} aria-label="close">
                <Close color="secondary" />
              </IconButton>{' '}
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
      </Dialog>
      <StyledButton onClick={openModal}>Who's in space?</StyledButton>
    </>
  );
}

function AstronautCard({ astronaut }: { astronaut: Astronaut }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledCard key={astronaut.id}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" columnGap={3}>
          <Avatar
            variant="rounded"
            src={astronaut.profile_image_thumbnail ?? ''}
            alt={astronaut.name}
            sx={{
              width: '65px',
              height: '65px',
            }}
          />
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
          >
            <Stack direction="row" alignItems="center">
              <Typography mr={1}>{astronaut.name}</Typography>
              <OpenInNew />
            </Stack>
          </Link>
        </Stack>
        <IconButton
          aria-label="expand info"
          sx={{ color: 'white' }}
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
