import { Close, ErrorOutline } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  ImageOverlay,
  LayerGroup,
  Circle,
} from 'react-leaflet';
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
  const { location, isError } = useISSLocation();

  return (
    <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="md">
      {!isError ? (
        <>
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
                scrollWheelZoom={false}
                minZoom={1}
                zoom={4}
                style={{ minHeight: '500px', width: '100%' }}
              >
                <TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
                <LayerGroup>
                  <ImageOverlay
                    zIndex={1000}
                    url={ISS}
                    bounds={[
                      [
                        parseFloat(location.latitude) - 2,
                        parseFloat(location.longitude) - 3,
                      ],
                      [
                        parseFloat(location.latitude) + 2,
                        parseFloat(location.longitude) + 3,
                      ],
                    ]}
                  />
                  <Circle
                    center={[
                      parseFloat(location.latitude),
                      parseFloat(location.longitude),
                    ]}
                    radius={400000}
                    fillColor="#ffff33"
                    fillOpacity={0.1}
                    color="#ffff33"
                    weight={1}
                  />
                </LayerGroup>
              </MapContainer>
            )}
          </DialogContent>
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
