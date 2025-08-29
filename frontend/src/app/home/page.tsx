"use client";

import DateSelector from "./_components/DateSelector";
import Greeting from "./_components/Greeting";
import CoreMetrics from "./_components/CoreMetrics";
import SleepStages from "./_components/SleepStages";
import WellnessIndicators from "./_components/WellnessIndicators";
import { Stack } from "@mui/material";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const test = async () => {
      const res = await fetch("/api/sleep/all");
      const json = await res.json();
      console.log(json);
    };

    test();
  }, []);
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
