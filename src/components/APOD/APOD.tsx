import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
import { useAPOD } from 'hooks';
import { StyledButton } from '../../App';

export default function APOD() {
  const [APODmodalOpen, setAPODmodalOpen] = useState(false);
  const { APOD, loading } = useAPOD();

  function closeModal() {
    setAPODmodalOpen(false);
  }

  return (
    <>
      <Dialog open={APODmodalOpen} onClose={closeModal} fullWidth maxWidth="lg">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <DialogTitle
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{APOD?.title}</Typography>
              <IconButton onClick={closeModal} aria-label="close">
                <Close color="secondary" />
              </IconButton>{' '}
            </DialogTitle>
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={APOD?.url}
                alt={APOD?.title}
                sx={{ width: '100%' }}
              />
              <Typography mt={2} textAlign="justify">
                {APOD?.explanation}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
      <StyledButton onClick={() => setAPODmodalOpen(true)}>
        Astronomy Photo of the Day
      </StyledButton>
    </>
  );
}

// TODO: add function to check if AOTD is fresh (from today)
