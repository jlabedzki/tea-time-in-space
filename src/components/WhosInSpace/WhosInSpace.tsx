import { Close } from '@mui/icons-material';
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
} from '@mui/material';
import { useState } from 'react';
import { StyledButton } from '../../App';
import { useWhosInSpace } from 'hooks';

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
                {astronauts?.map((astronaut, i) => (
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexGrow: 1,
                      height: '50px',
                      px: 2,
                    }}
                    key={astronaut.id}
                  >
                    <Link
                      color="#4cabff"
                      href={`https://www.google.com/search?${new URLSearchParams(
                        {
                          q: astronaut.name,
                        }
                      ).toString()}`}
                      target="_blank"
                    >
                      <Typography>{astronaut.name}</Typography>
                    </Link>
                  </Card>
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
