"use client";

import { Stack, Typography } from "@mui/material";
import LastSleepItem from "./LastSleepItem";
import { LastNightSleep } from "../../../../../types/backend/sleep";
import { useQuery } from "@tanstack/react-query";

const LastSleep = () => {
  // const query = useQuery<LastNightSleep>({
  //   queryKey: ["lastNightSleep"],
  //   queryFn: async () => {
  //     const res = await fetch("http://localhost:5000/sleep/lastnight");

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch sleep data.");
  //     }
  //     return await res.json();
  //   },
  //   retry: 1,
  // });

  return (
    <>
      <Typography>January 1, 2006</Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={5}
      >
        <LastSleepItem
          title={"Total Sleep"}
          displayContent={
            <Typography variant="h5" fontWeight="bold">
              8h 30m
            </Typography>
          }
          sx={{
            borderRadius: 4,
            bgcolor: "grey.100",
            color: "grey.800",
          }}
        />
        <LastSleepItem
          title={"Bedtime"}
          displayContent={
            <Typography variant="h5" fontWeight="bold">
              9:30 PM{" "}
            </Typography>
          }
          sx={{
            borderRadius: 4,
            bgcolor: "grey.100",
            color: "grey.800",
          }}
        />
        <LastSleepItem
          title={"Efficiency"}
          displayContent={
            <Typography variant="h4" fontWeight="bold">
              77
            </Typography>
          }
          sx={{
            borderRadius: "50%",
            background: "linear-gradient(145deg, #2CDFFF, #00A2E8)",
            color: "secondary.contrastText",
            boxShadow: "0px 4px 15px rgba(0, 162, 232, 0.25)",
          }}
        />
      </Stack>
    </>
  );
};

export default LastSleep;
