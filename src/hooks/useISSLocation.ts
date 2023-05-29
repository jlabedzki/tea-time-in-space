import { useEffect, useState } from 'react';
import * as z from 'zod';

const ISSPositionSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

const ISSLocationResponse = z.object({
  iss_position: ISSPositionSchema,
  message: z.string(),
  timestamp: z.number(),
});

export type ISSPosition = z.infer<typeof ISSPositionSchema>;
type ISSLocationResponse = z.infer<typeof ISSLocationResponse>;

export default function useISSLocation() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [location, setLocation] = useState<ISSPosition>();

  useEffect(() => {
    const fetchISS = async () => {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data = validateISSResponse(await response.json());
      setLocation(data.iss_position);
      setInitialLoading(false);
    };
    fetchISS();
    const interval = setInterval(fetchISS, 1000);
    return () => clearInterval(interval);
  }, []);

  return { location, initialLoading };
}

function validateISSResponse(data: unknown): ISSLocationResponse {
  const result = ISSLocationResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }

  throw new Error(result.error.message);
}
