"use client";

import { Box, Stack } from "@mui/material";
import Header from "../components/header/Header";
import ActionPlan from "../components/action-plan/ActionPlanCard";

const Home = () => {
  return (
    <Stack direction={"column"} spacing={3}>
      <Header />
      <ActionPlan />
    </Stack>
  );
};

export default Home;
