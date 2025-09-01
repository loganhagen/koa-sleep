"use client";

import DateSelector from "./_components/DateSelector";
import Greeting from "./_components/Greeting";
import CoreMetrics from "./_components/core-metrics/CoreMetrics";
import SleepStages from "./_components/SleepStages";
import WellnessIndicators from "./_components/wellness-indicators/WellnessIndicators";
import { Stack, CircularProgress, Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "../providers/userProvider";
import { useMostRecentSleepLog } from "@/hooks/useSleepLogs";

const Home = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const { user } = useUser();
  const { data: mostRecentSleepLog, isLoading: isSleepLogLoading } =
    useMostRecentSleepLog(user?.id);

  const getMostRecentDate = useCallback(() => {
    if (mostRecentSleepLog) {
      return new Date(mostRecentSleepLog.dateOfSleep);
    } else {
      return new Date();
    }
  }, [mostRecentSleepLog]);

  useEffect(() => {
    if (!isSleepLogLoading) {
      setTargetDate(getMostRecentDate());
    }
  }, [mostRecentSleepLog, isSleepLogLoading, getMostRecentDate]);

  const handleDateChange = (days: number) => {
    setTargetDate((prevDate) => {
      if (!prevDate) return null;
      const newDate = new Date(prevDate);
      newDate.setUTCDate(newDate.getUTCDate() + days);
      return newDate;
    });
  };

  const resetTargetDate = () => {
    setTargetDate(getMostRecentDate());
  };

  if (!targetDate || isSleepLogLoading) {
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
        mostRecentLogDate={
          mostRecentSleepLog ? new Date(mostRecentSleepLog.dateOfSleep) : null
        }
      />
      <Greeting />
      <CoreMetrics targetDate={targetDate} />
      {/* <WellnessIndicators targetDate={targetDate} /> */}
      {/* <SleepStages targetDate={targetDate} /> */}
    </Stack>
  );
};

export default Home;
