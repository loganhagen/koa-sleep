"use client";

import DateSelector from "./_components/DateSelector";
import Greeting from "./_components/Greeting";
import CoreMetrics from "./_components/CoreMetrics";
import SleepStages from "./_components/SleepStages";
import WellnessIndicators from "./_components/WellnessIndicators";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "../providers/userProvider";
import { useMostRecentSleepLog } from "@/hooks/useSleepLogs";
import { GreetingSkeleton } from "./_components/_skeletons/GreetingSkeleton";
import { CoreMetricsSkeleton } from "./_components/_skeletons/CoreMetricsSkeleton";
import { WellnessIndicatorsSkeleton } from "./_components/_skeletons/WellnessIndicatorsSkeleton";
import { SleepStagesSkeleton } from "./_components/_skeletons/SleepStagesSkeleton";
import { DateSelectorSkeleton } from "./_components/_skeletons/DateSelectorSkeleton";

const Home = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const { user } = useUser();
  const { data: mostRecentSleepLog, isLoading } = useMostRecentSleepLog(
    user?.id ?? ""
  );

  const getMostRecentDate = () => {
    if (mostRecentSleepLog) {
      return new Date(`${mostRecentSleepLog.dateOfSleep}T00:00:00`);
    } else {
      return new Date();
    }
  };

  const handleDateChange = (days: number) => {
    setTargetDate((prevDate) => {
      if (!prevDate) return null;
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  useEffect(() => {
    if (mostRecentSleepLog) {
      setTargetDate(getMostRecentDate());
    } else if (!isLoading) {
      setTargetDate(new Date());
    }
  }, [mostRecentSleepLog, isLoading]);

  const resetTargetDate = () => {
    setTargetDate(getMostRecentDate());
  };

  if (!targetDate || isLoading) {
    return (
      <Stack direction={"column"} spacing={3}>
        <DateSelectorSkeleton />
        <GreetingSkeleton />
        <CoreMetricsSkeleton />
        <WellnessIndicatorsSkeleton />
        <SleepStagesSkeleton />
      </Stack>
    );
  }
  return (
    <Stack direction={"column"} spacing={3}>
      <DateSelector
        targetDate={targetDate}
        handleDateChange={handleDateChange}
        handleResetToToday={resetTargetDate}
      />
      <Greeting />
      <CoreMetrics targetDate={targetDate} />
      <WellnessIndicators />
      <SleepStages />
    </Stack>
  );
};

export default Home;
