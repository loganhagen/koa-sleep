"use client";

import DateSelector from "./_components/DateSelector";
import Greeting from "./_components/Greeting";
import CoreMetrics from "./_components/CoreMetrics";
import SleepStages from "./_components/SleepStages";
import WellnessIndicators from "./_components/WellnessIndicators";
import { Stack } from "@mui/material";
import { useState } from "react";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (days: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  const handleResetToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <Stack direction={"column"} spacing={3}>
      <DateSelector
        currentDate={currentDate}
        handleDateChange={handleDateChange}
        handleResetToToday={handleResetToToday}
      />
      <Greeting />
      <CoreMetrics />
      <WellnessIndicators />
      <SleepStages />
    </Stack>
  );
};

export default Home;
