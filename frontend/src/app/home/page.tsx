"use client";

import { Box, Stack } from "@mui/material";
import ActionPlan from "./_components/ActionPlanCard";
import DailyCheckIn from "./_components/DailyCheckIn";
import Greeting from "./_components/header/Greeting";
import YourLastSleep from "./_components/header/YourLastSleep";

const Home = () => {
  return (
    <Stack direction={"column"} spacing={3}>
      <Stack direction={"row"} spacing={3}>
        <Greeting />
        <YourLastSleep />
      </Stack>
      <DailyCheckIn />
      <ActionPlan />
    </Stack>
  );
};

export default Home;
