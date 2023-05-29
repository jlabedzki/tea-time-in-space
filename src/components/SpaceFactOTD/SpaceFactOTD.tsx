import { Grid, Typography, useTheme } from '@mui/material';
import { useFactOTD } from 'hooks';
import { spaceFacts } from '../../spaceFacts';

export default function SpaceFactOTD() {
  const theme = useTheme();
  const factIndex = useFactOTD();

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
            minHeight: '70px',
            background: theme.palette.primary.main + '50',
            borderLeft: `8px solid ${theme.palette.secondary.main}`,
          }}
        >
          {factIndex !== undefined && spaceFacts[factIndex]}
        </Typography>
      </Grid>
    </Grid>
  );
}
