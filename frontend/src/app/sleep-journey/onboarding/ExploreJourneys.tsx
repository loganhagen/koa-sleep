import { Box, Typography, Stack } from "@mui/material";
import JourneyCard from "./JourneyCard";
import { SxProps, Theme } from "@mui/material/styles";

interface Journey {
  title: string;
  description: string;
}

interface ExploreJourneysProps {
  journeys: Journey[];
  cardHoverStyles: SxProps<Theme>;
}

const ExploreJourneys = ({
  journeys,
  cardHoverStyles,
}: ExploreJourneysProps) => (
  <Stack spacing={4} sx={{ width: "100%", alignItems: "center" }}>
    <Typography variant="h4" component="h2">
      Explore All Journeys
    </Typography>
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        width: "100%",
        maxWidth: "1200px",
      }}
    >
      {journeys.map((journey) => (
        <JourneyCard
          key={journey.title}
          journey={journey}
          sx={cardHoverStyles}
        />
      ))}
    </Box>
  </Stack>
);

export default ExploreJourneys;
