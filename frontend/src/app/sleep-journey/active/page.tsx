import { Stack, Typography } from "@mui/material";
import JourneyStatusHeader from "./_components/header/JourneyStatusHeader";
import WeeklyProgressSection from "./_components/progress/WeeklyProgressSection";
import JourneyRecap from "./_components/recap/ThisWeekRecap";

const ActiveJourneyPage = () => {
  const currentJourney = {
    title: "Consistent Bedtimes ⏰",
    progressText: "Keep up the great work building a healthier routine!",
    description:
      "This journey is all about going to bed at consistent times. Consistency is key to regulating your body's internal clock and improving your sleep quality.",
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
        description={currentJourney.description}
      />
      <WeeklyProgressSection />
      <JourneyRecap />
    </Stack>
  );
};

export default ActiveJourneyPage;
