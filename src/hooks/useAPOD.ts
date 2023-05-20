import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import * as z from 'zod';

const NASA_API_KEY = process.env.NASA_API_KEY || '';

const APODResponseSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  hdurl: z.string(),
  media_type: z.string(),
  service_version: z.string(),
  title: z.string(),
  url: z.string(),
});

export type APODResponse = z.infer<typeof APODResponseSchema>;

export default function useAPOD() {
  const [APOD, setAPOD] = useState<APODResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndSetAOTD() {
      let { APOD } = await chrome.storage.local.get('APOD');

      if (APOD && !isAPODstale(APOD)) {
        setAPOD(validateAPODResponse(APOD));
        setLoading(false);
        return;
      }

      APOD = await fetchAPOD();
      await chrome.storage.local.set({ APOD });
      setAPOD(APOD);
      setLoading(false);
    }

    fetchAndSetAOTD();
  }, []);

  return { APOD, loading };
}

async function fetchAPOD() {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
  );
  return validateAPODResponse(await res.json());
}

function validateAPODResponse(data: unknown): APODResponse {
  const result = APODResponseSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }

  throw new Error(result.error.message);
}

function isAPODstale(APOD: APODResponse) {
  return APOD.date !== format(new Date(), 'yyyy-MM-dd');
}
