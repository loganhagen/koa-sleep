import { Typography, Stack, Paper, Button } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface Journey {
  title: string;
  description: string;
}

interface JourneyCardProps {
  journey: Journey;
  sx?: SxProps<Theme>;
}

const JourneyCard = ({ journey, sx }: JourneyCardProps) => (
  <Paper
    elevation={0}
    variant="outlined"
    sx={{
      p: 3,
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      ...sx,
    }}
  >
    <Stack spacing={1.5}>
      <Typography variant="h6" component="h3" sx={{ fontWeight: "bold" }}>
        {journey.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {journey.description}
      </Typography>
    </Stack>
    <Button variant="outlined" sx={{ mt: 3, alignSelf: "start" }}>
      Learn More
    </Button>
  </Paper>
);

export default JourneyCard;
