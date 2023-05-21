import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { StyledButton } from '../../App';

const API_KEY = process.env.NASA_API_KEY ?? '';

type Rover = 'curiosity' | 'opportunity' | 'spirit' | 'perseverance';
const ROVER_OPTIONS: { value: Rover; label: string }[] = [
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'opportunity', label: 'Opportunity' },
  { value: 'spirit', label: 'Spirit' },
  { value: 'perseverance', label: 'Perseverance' },
];

export default function MarsPhotos() {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [rover, setRover] = useState<Rover>('curiosity');
  const [photos, setPhotos] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${API_KEY}`
    )
      .then(async (res) => {
        const data = await res.json();

        console.log('data', data);
        setPhotos(data.latest_photos ?? []);
        setActiveIndex(0);
      })
      .catch((err) => console.log('err', err));
  }, [rover]);

  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        fullWidth
        maxWidth="md"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            handlePrevious();
          }
          if (e.key === 'ArrowRight') {
            handlePrevious();
          }
        }}
        PaperProps={{ sx: { py: 5 } }}
      >
        <DialogTitle>
          <FormControl>
            <InputLabel id="rover-label">Rover</InputLabel>
            <Select
              labelId="rover-label"
              id="rover"
              value={rover}
              label="Rover"
              onChange={(e) => setRover(e.target.value as Rover)}
              inputProps={{ sx: { color: theme.palette.secondary.main } }}
            >
              {ROVER_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogTitle>
        <DialogContent>
          {photos.length > 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              <IconButton onClick={handlePrevious} size="large">
                <ChevronLeft color="secondary" />
              </IconButton>
              <Box
                component="img"
                // flex="1"
                width="80%"
                src={photos[activeIndex]?.img_src}
                alt={`Photo ${activeIndex + 1} of ${
                  photos.length
                } recently taken by ${rover}`}
                sx={{
                  border: `2px solid ${theme.palette.secondary.main}`,
                  borderRadius: '30px',
                }}
              />

              <IconButton onClick={handleNext}>
                <ChevronRight color="secondary" />
              </IconButton>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <StyledButton onClick={openModal}>Mars photos</StyledButton>
    </>
  );
}
