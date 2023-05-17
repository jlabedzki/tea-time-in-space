import { Close } from '@mui/icons-material';
import {
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { StyledButton } from '../../App';

const PersonSchema = z.object({
  craft: z.string(),
  name: z.string(),
});

const ApiResponseSchema = z.object({
  message: z.string(),
  number: z.number(),
  people: z.array(PersonSchema),
});

type ApiResponse = z.infer<typeof ApiResponseSchema>;

export default function WhosInSpace() {
  const [modalOpen, setModalOpen] = useState(false);
  const [peopleInSpace, setPeopleInSpace] = useState<ApiResponse>();

  useEffect(() => {
    getWhoIsInSpace().then((data) => setPeopleInSpace(data));
  }, []);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize="1.5rem" fontWeight={500} mr={5}>
            People currently in space: {peopleInSpace?.number}
          </Typography>
          <IconButton onClick={closeModal} aria-label="close">
            <Close color="secondary" />
          </IconButton>{' '}
        </DialogTitle>
        <DialogContent>
          <Stack gap={2}>
            {peopleInSpace?.people.map((person, i) => (
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  height: '50px',
                  px: 2,
                }}
                key={`${person.name}-${person.craft}`}
              >
                <Link
                  color="#4cabff"
                  href={`https://www.google.com/search?${new URLSearchParams({
                    q: person.name,
                  }).toString()}`}
                  target="_blank"
                >
                  <Typography>{person.name}</Typography>
                </Link>
                <Typography ml={1}>({person.craft})</Typography>
              </Card>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
      <StyledButton onClick={openModal}>Who's in space?</StyledButton>
    </>
  );
}

async function getWhoIsInSpace() {
  const response = await fetch('http://api.open-notify.org/astros.json');
  return validateApiResponse(await response.json());
}

function validateApiResponse(data: unknown): ApiResponse {
  const result = ApiResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
}
