import { Stack, Typography } from "@mui/material";
import JourneyStatusHeader from "./JourneyStatusHeader";
import WeeklyProgressSection from "./WeeklyProgressSection";

const ActiveJourneyPage = () => {
  const currentJourney = {
    title: "Consistent Bedtimes ⏰",
    progressText: "Keep up the great work building a healthier routine!",
  };

  return (
    <Stack spacing={6} sx={{ p: 3, alignItems: "center" }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Sleep Journey
      </Typography>

      <JourneyStatusHeader
        journeyTitle={currentJourney.title}
        progressText={currentJourney.progressText}
      />

      <WeeklyProgressSection />
    </Stack>
  );
};

export default ActiveJourneyPage;
