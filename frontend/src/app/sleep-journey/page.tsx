"use client";

import { Stack } from "@mui/material";
import JourneyHeader from "./onboarding/JourneyHeader";
import RecommendedJourneyCard from "./onboarding/RecommendedJourneyCard";
import ExploreJourneys from "./onboarding/ExploreJourneys";
import { useState } from "react";

const SleepJourneyPage = () => {
  const [journeyStarted, setJourneyStarted] = useState(false);
  const availableJourneys = [
    {
      title: "Consistent Bedtimes ⏰",
      description:
        "Build a stable sleep schedule to improve your body's internal clock and wake up more refreshed.",
    },
    {
      title: "Mindful Mornings ☀️",
      description:
        "Start your day with calm and focus, setting a positive tone that lasts until bedtime.",
    },
    {
      title: "Evening Wind-Down 🌙",
      description:
        "Learn techniques to relax your mind and body before bed for deeper, more restful sleep.",
    },
  ];

  const cardHoverStyles = {
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: 3,
    },
  };

  if (journeyStarted) {
    return <p>Let's go on a journey</p>;
  } else {
    return (
      <Stack spacing={6} sx={{ p: 3, alignItems: "center" }}>
        <JourneyHeader />
        <RecommendedJourneyCard sx={cardHoverStyles} />
        <ExploreJourneys
          journeys={availableJourneys}
          cardHoverStyles={cardHoverStyles}
        />
      </Stack>
    );
  }
};

export default SleepJourneyPage;
