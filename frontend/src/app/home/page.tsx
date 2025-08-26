"use client";

import { Box, Stack, Grid } from "@mui/material";
import ActionPlan from "./_components/ActionPlanCard";
import DailyCheckIn from "./_components/DailyCheckIn";
import Greeting from "./_components/Greeting";
import YourLastSleep from "./_components/YourLastSleep";
import SleepStages from "./_components/SleepStages";

const Home = () => {
  return (
    <Stack direction={"column"} spacing={3}>
      <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
        <Greeting />
        <YourLastSleep />
      </Stack>
      <SleepStages />
      <DailyCheckIn />
      <ActionPlan />
    </Stack>
  );
};

export default Home;
