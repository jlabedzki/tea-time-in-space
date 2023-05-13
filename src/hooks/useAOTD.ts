import { useQuery } from 'react-query';
const NASA_API_KEY = process.env.NASA_API_KEY || '';

export default function useAOTD() {
  const { data, isLoading, isError, ...rest } = useQuery('aotd', async () => {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );
    return res.json();
  });

  console.log('data', data);

  return { data, isLoading, isError, ...rest };
}
