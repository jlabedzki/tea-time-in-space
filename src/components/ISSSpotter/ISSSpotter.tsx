import { useState } from 'react';
import { StyledButton } from '../../App';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

export default function ISSSpotter() {
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle>Map</DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
      <StyledButton onClick={openModal}>ISS Spotter</StyledButton>
    </>
  );
}
