import { useEffect, useState } from 'react';
import { StyledButton } from '../../App';
import { Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import { set } from 'date-fns';

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
      <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>
            People currently in space: {peopleInSpace?.number}
          </Typography>
          <IconButton onClick={closeModal} aria-label="close">
            <Close color="secondary" />
          </IconButton>{' '}
        </DialogTitle>
        {peopleInSpace?.people.map((person) => (
          <div>{person.name}</div>
        ))}
      </Dialog>
      <StyledButton onClick={openModal}>Who's in space?</StyledButton>
    </>
  );
}

import { z } from 'zod';
import { Close } from '@mui/icons-material';

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

const getWhoIsInSpace = async () => {
  const response = await fetch('http://api.open-notify.org/astros.json');
  return validateApiResponse(await response.json());
};

function validateApiResponse(data: unknown): ApiResponse {
  const result = ApiResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
}
