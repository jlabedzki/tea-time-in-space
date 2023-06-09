import { FormControl, IconButton, TextField, useTheme } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useState } from 'react';

export default function GoogleSearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query) return;

    const isUrl =
      /^(https?:\/\/)?(www\.)?([a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]+)(\/[^\s]*)?$/.test(
        query
      );

    if (!isUrl) {
      const searchParams = new URLSearchParams({ q: query }).toString();
      return window.location.replace(
        `https://www.google.com/search?${searchParams}`
      );
    }

    if (!query.startsWith('www') || !query.startsWith('https')) {
      return (window.location.href = `https://${query}`);
    }

    return (window.location.href = query);
  };

  const theme = useTheme();
  return (
    <FormControl sx={{ width: 'inherit', maxWidth: '550px' }}>
      <TextField
        fullWidth
        placeholder="Search Google or type a URL"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        color="primary"
        autoComplete="off"
        sx={{
          borderRadius: '30px',
          background: theme.palette.secondary.main,
        }}
        InputProps={{
          sx: {
            height: '45px',
          },
          startAdornment: (
            <IconButton>
              <SearchOutlined />
            </IconButton>
          ),
        }}
      />
    </FormControl>
  );
}
