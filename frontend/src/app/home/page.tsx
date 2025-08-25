"use client";

import { Stack } from "@mui/material";
import Header from "./_components/header/Header";
import ActionPlan from "./_components/ActionPlanCard";
import DailyCheckIn from "./_components/DailyCheckIn";

const Home = () => {
  return (
    <Stack direction={"column"} spacing={3}>
      <Header />
      {/* <DailyCheckIn /> */}
      <ActionPlan />
    </Stack>
  );
};

export default Home;
