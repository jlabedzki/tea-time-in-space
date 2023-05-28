import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import { StyledButton } from '../../App';

export default function ISSSpotter() {
  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState();

  useEffect(() => {
    const fetchISS = async () => {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data = await response.json();
      console.log('data: ', data);
      setLocation(data.iss_position);
    };
    fetchISS();
  }, []);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>Location:</DialogTitle>
        <DialogContent>
          <div>{location?.latitude}</div>
          <div>{location?.longitude}</div>
          {location && (
            <MapContainer
              center={[
                parseInt(location.latitude, 10),
                parseInt(location.longitude, 10),
              ]}
              zoom={4}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Circle
                center={[
                  parseInt(location.latitude, 10),
                  parseInt(location.longitude, 10),
                ]}
                radius={750000}
              ></Circle>
            </MapContainer>
          )}
        </DialogContent>
      </Dialog>
      <StyledButton onClick={openModal}>ISS Spotter</StyledButton>
    </>
  );
}
