import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { MapContainer, TileLayer, ImageOverlay, Circle } from 'react-leaflet';
import ISS from 'assets/img/iss.png';
import { useISSLocation } from 'hooks';
import { StyledButton } from '../../App';

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
      {modalOpen && <ISSModal modalOpen={modalOpen} closeModal={closeModal} />}
      <StyledButton onClick={openModal}>ISS Spotter</StyledButton>
    </>
  );
}

function ISSModal(props: { modalOpen: boolean; closeModal: () => void }) {
  const { modalOpen, closeModal } = props;
  const { location, initialLoading } = useISSLocation();

  return (
    <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" columnGap={1}>
            <Typography>Realtime coordinates (lat/long): </Typography>
            <Typography fontWeight={500}>{location?.latitude},</Typography>
            <Typography fontWeight={500}>{location?.longitude}</Typography>
          </Stack>
          <IconButton onClick={closeModal} aria-label="close">
            <Close color="secondary" />
          </IconButton>
        </Stack>
        <Stack rowGap={1}>
          <Typography>Speed: ~28,000 km/hr (17,400 mph)</Typography>
          <Typography fontSize="0.85rem">
            *The ISS image on the map is not to scale.
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {location && (
          <MapContainer
            center={[
              parseFloat(location.latitude),
              parseFloat(location.longitude),
            ]}
            minZoom={1}
            zoom={4}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ImageOverlay
              url={ISS}
              bounds={[
                [
                  parseFloat(location.latitude) - 3,
                  parseFloat(location.longitude) - 5,
                ],
                [
                  parseFloat(location.latitude) + 3,
                  parseFloat(location.longitude) + 5,
                ],
              ]}
            />
          </MapContainer>
        )}
      </DialogContent>
    </Dialog>
  );
}
