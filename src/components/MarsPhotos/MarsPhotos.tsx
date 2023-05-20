import { useEffect } from 'react';
import { StyledButton } from '../../App';

const API_KEY = process.env.NASA_API_KEY ?? '';

// 1. Need a date picker and rover picker to fetch data
//   a. can default to today and curiosity
// 2. probably too much data to store in local storage
// 3. display images in a carousel

export default function MarsPhotos() {
  useEffect(() => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`
    ).then(async (res) => {
      const data = await res.json();
      console.log('daga', data);
    });
  }, []);

  return <StyledButton>Mars photos</StyledButton>;
}
