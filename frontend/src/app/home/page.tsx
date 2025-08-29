"use client";

import DateSelector from "./_components/DateSelector";
import Greeting from "./_components/Greeting";
import CoreMetrics from "./_components/CoreMetrics";
import SleepStages from "./_components/SleepStages";
import WellnessIndicators from "./_components/WellnessIndicators";
import { Stack } from "@mui/material";

const Home = () => {
  return (
    <Stack direction={"column"} spacing={3}>
      <DateSelector />
      <Greeting />
      <CoreMetrics />
      <WellnessIndicators />
      <SleepStages />
    </Stack>
  );
};

export default Home;
