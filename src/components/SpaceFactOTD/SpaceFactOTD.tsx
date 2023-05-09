import { Grid, Stack, Typography, useTheme } from '@mui/material';

export default function SpaceFactOTD() {
  const theme = useTheme();
  return (
    <Grid container direction="row" justifyContent="center" flexWrap="nowrap">
      <Grid item>
        <Typography variant="h1" lineHeight={1} pr={2} width="max-content">
          Fact of
          <br />
          the day
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          p={2}
          sx={{
            background: theme.palette.primary.main + '50',
            borderLeft: `8px solid ${theme.palette.secondary.main}`,
          }}
        >
          There are approximately 10,000 stars in the observable universe per
          each grain of sand on Earth. With there being roughly 7.5 sextillion
          grains of sand on Earth, that makes the number of stars in the
          universe approximately 7.5 septillion, or
          75,000,000,000,000,000,000,000,000.
        </Typography>
      </Grid>
    </Grid>
  );
}
