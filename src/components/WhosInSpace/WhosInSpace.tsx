import { Close, OpenInNew } from '@mui/icons-material';
import {
  Card,
  CircularProgress,
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
import { useWhosInSpace } from 'hooks';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  height: '50px',
  padding: `0 ${theme.spacing(2)}`,
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
      <Dialog open={modalOpen} onClose={closeModal}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <DialogTitle
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="1.5rem" fontWeight={500} mr={5}>
                People currently in space: {astronauts?.length}
              </Typography>
              <IconButton onClick={closeModal} aria-label="close">
                <Close color="secondary" />
              </IconButton>{' '}
            </DialogTitle>
            <DialogContent>
              <Stack gap={2}>
                {astronauts?.map((astronaut) => (
                  <StyledCard key={astronaut.id}>
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
                  </StyledCard>
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
