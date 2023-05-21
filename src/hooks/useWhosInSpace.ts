import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import * as z from 'zod';

const statusSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const typeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const agencySchema = z.object({
  id: z.number(),
  url: z.string().url(),
  name: z.string(),
  featured: z.boolean(),
  type: z.nullable(z.string()),
  country_code: z.string(),
  abbrev: z.string(),
  description: z.nullable(z.string()),
  administrator: z.nullable(z.string()),
  founding_year: z.nullable(z.string()),
  launchers: z.string(),
  spacecraft: z.string(),
  parent: z.nullable(z.string()),
  image_url: z.nullable(z.string().url()),
  logo_url: z.nullable(z.string().url()),
});

const astronautSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  name: z.string(),
  status: statusSchema,
  type: typeSchema,
  in_space: z.boolean(),
  time_in_space: z.string(),
  eva_time: z.string(),
  age: z.nullable(z.number()),
  date_of_birth: z.nullable(z.string()),
  date_of_death: z.nullable(z.string()),
  nationality: z.string(),
  twitter: z.nullable(z.string().url()),
  instagram: z.nullable(z.string().url()),
  wiki: z.nullable(z.string().url()),
  bio: z.string(),
  agency: agencySchema,
  profile_image: z.nullable(z.string().url()),
  profile_image_thumbnail: z.nullable(z.string().url()),
  flights_count: z.nullable(z.number()),
  landings_count: z.nullable(z.number()),
  spacewalks_count: z.nullable(z.number()),
  last_flight: z.nullable(z.string().datetime()),
  first_flight: z.nullable(z.string().datetime()),
});

type Astronaut = z.infer<typeof astronautSchema>;

const responseSchema = z.object({
  count: z.number(),
  next: z.nullable(z.string()),
  previous: z.nullable(z.string()),
  results: z.array(astronautSchema),
});

type APIResponse = z.infer<typeof responseSchema>;

export default function useWhosInSpace() {
  const [astronauts, setAstronauts] = useState<Astronaut[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndSetAstronauts() {
      let { astronauts, dateAstronautsFetched } =
        await chrome.storage.local.get(['astronauts', 'dateAstronautsFetched']);

      if (astronauts && isWithinSevenDays(dateAstronautsFetched)) {
        setAstronauts(validateResponse(astronauts));
        setLoading(false);
        return;
      }

      astronauts = await fetchAstronauts();
      await chrome.storage.local.set({
        astronauts,
        dateAstronautsFetched: format(new Date(), 'yyyy-MM-dd'),
      });
      setAstronauts(astronauts);
      setLoading(false);
    }

    fetchAndSetAstronauts();
  }, []);

  return { astronauts, loading };
}

async function fetchAstronauts() {
  const subDomain = process.env.NODE_ENV === 'development' ? 'lldev' : 'll';
  const res = await fetch(
    `https://${subDomain}.thespacedevs.com/2.2.0/astronaut/?in_space=true&limit=100`
  );
  return validateResponse(
    ((await res.json()) as APIResponse).results.filter(
      (astronaut: Astronaut) => astronaut.name !== 'Starman'
    )
  );
}

function validateResponse(data: unknown): Astronaut[] {
  const result = z.array(astronautSchema).safeParse(data);
  if (result.success) {
    return result.data;
  }

  throw new Error(result.error.message);
}

// datestring is formated as yyyy-MM-dd
function isWithinSevenDays(datestring: string) {
  const diff = new Date().getTime() - new Date(datestring).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days < 7;
}
