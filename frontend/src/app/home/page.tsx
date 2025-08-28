"use client";

import { Grid, Stack } from "@mui/material";
import Greeting from "./_components/Greeting";
import CoreMetrics from "./_components/CoreMetrics";
import SleepStages from "./_components/SleepStages";
import WellnessIndicators from "./_components/WellnessIndicators";

const Home = () => {
  return (
    <Stack direction={"column"} spacing={1}>
      <Greeting />
      <CoreMetrics />
      <WellnessIndicators />
      <SleepStages />
    </Stack>
  );
};

export default Home;
