import { Card, CardContent, Typography, Box, Stack, Icon } from "@mui/material";
import ModeNightIcon from "@mui/icons-material/ModeNight";

export default function SleepChart() {
  return (
    <Card
      sx={{
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          pb: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction="row" sx={{ mb: 1 }}>
          <Typography variant="h5" sx={{ mr: 1 }}>
            Sleep
          </Typography>
          <ModeNightIcon />
        </Stack>

        <Box>
          <Stack direction="row" spacing={3}>
            <Stack direction="column">
              <Typography>Duration</Typography>
              <Typography>Efficiency</Typography>
              <Typography>Wake</Typography>
              <Typography>Light</Typography>
              <Typography>Deep</Typography>
            </Stack>
            <Stack direction="column">
              <Typography>6 hr 50 min</Typography>
              <Typography>65</Typography>
              <Typography>4</Typography>
              <Typography>2</Typography>
              <Typography>1</Typography>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
