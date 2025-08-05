"use client";

import { Stack } from "@mui/material";
import Header from "../components/header/Header";
import ActionPlan from "../components/action-plan/ActionPlanCard";
import DailyCheckIn from "../components/daily-check-in/DailyCheckIn";

const Home = () => {
  return (
    <Stack direction={"column"} spacing={3}>
      <Header />
      <DailyCheckIn />
      <ActionPlan />
    </Stack>
  );
};

export default Home;
