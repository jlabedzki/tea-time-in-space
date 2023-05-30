import { useEffect, useState } from 'react';
import * as z from 'zod';

const ISSPositionSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

const APIResponse = z.object({
  iss_position: ISSPositionSchema,
  message: z.string(),
  timestamp: z.number(),
});

export type ISSPosition = z.infer<typeof ISSPositionSchema>;
type ISSLocationResponse = z.infer<typeof APIResponse>;

export default function useISSLocation() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [location, setLocation] = useState<ISSPosition>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) return;

    const fetchISS = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = validateISSResponse(await response.json());
        setLocation(data.iss_position);
      } catch (e) {
        console.error(e);
        setIsError(true);
      }
      setInitialLoading(false);
    };

    fetchISS();

    const interval = setInterval(fetchISS, 1000);
    return () => clearInterval(interval);
  }, [isError]);

  return { location, initialLoading, isError };
}

function validateISSResponse(data: unknown): ISSLocationResponse {
  const result = APIResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }

  throw new Error(result.error.message);
}
