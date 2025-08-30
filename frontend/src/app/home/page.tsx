"use client";

import DateSelector from "./_components/DateSelector";
import Greeting from "./_components/Greeting";
import CoreMetrics from "./_components/core-metrics/CoreMetrics";
import SleepStages from "./_components/SleepStages";
import WellnessIndicators from "./_components/WellnessIndicators";
import { Stack, CircularProgress, Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "../providers/userProvider";
import { useMostRecentSleepLog } from "@/hooks/useSleepLogs";
import { formatDateToYYYYMMDD } from "@/utils/utils";

const Home = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const { user } = useUser();
  const { data: mostRecentSleepLog, isLoading } = useMostRecentSleepLog(
    user?.id
  );

  const getMostRecentDate = useCallback(() => {
    if (mostRecentSleepLog) {
      return new Date(`${mostRecentSleepLog.dateOfSleep}T00:00:00`);
    } else {
      return new Date();
    }
  }, [mostRecentSleepLog]);

  useEffect(() => {
    if (!isLoading) {
      setTargetDate(getMostRecentDate());
    }
  }, [mostRecentSleepLog, isLoading, getMostRecentDate]);

  const handleDateChange = (days: number) => {
    setTargetDate((prevDate) => {
      if (!prevDate) return null;
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  const resetTargetDate = () => {
    setTargetDate(getMostRecentDate());
  };

  if (!targetDate || isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
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
      <CoreMetrics targetDate={formatDateToYYYYMMDD(targetDate)} />
      <WellnessIndicators />
      <SleepStages />
    </Stack>
  );
};

export default Home;
