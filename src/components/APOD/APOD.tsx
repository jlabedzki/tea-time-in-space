import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { Close, ErrorOutline } from '@mui/icons-material';
import { useState } from 'react';
import { useAPOD } from 'hooks';
import { StyledButton } from '../../App';

export default function APOD() {
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      {modalOpen && <APODModal modalOpen={modalOpen} closeModal={closeModal} />}
      <StyledButton onClick={openModal}>
        Astronomy Photo of the Day
      </StyledButton>
    </>
  );
}

function APODModal(props: { modalOpen: boolean; closeModal: () => void }) {
  const { modalOpen, closeModal } = props;
  const { APOD, loading, isError } = useAPOD();

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
              <DialogTitle
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize="1.5rem" fontWeight={500}>
                  {APOD?.title}
                </Typography>
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
                {APOD?.media_type === 'image' ? (
                  <>
                    <Box
                      component="img"
                      src={APOD?.url}
                      alt={APOD?.title}
                      sx={{ width: '100%' }}
                    />
                    {APOD?.copyright && (
                      <Typography alignSelf="start">
                        © {APOD.copyright}
                      </Typography>
                    )}
                  </>
                ) : (
                  <iframe
                    src={APOD?.url}
                    style={{
                      minHeight: '500px',
                      width: '100%',
                      border: 'none',
                    }}
                  />
                )}
                <Typography mt={2} textAlign="justify">
                  {APOD?.explanation}
                </Typography>
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
