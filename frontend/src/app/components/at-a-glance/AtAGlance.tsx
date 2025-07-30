"use client";

import { Stack, Typography } from "@mui/material";
import GlanceItem from "./GlanceItem";
import { LastNightSleep } from "../../../../../types/backend/sleep";
import { useQuery } from "@tanstack/react-query";

const AtAGlance = () => {
  const query = useQuery<LastNightSleep>({
    queryKey: ["lastNightSleep"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/sleep/lastnight");

      if (!res.ok) {
        throw new Error("Failed to fetch sleep data.");
      }
      return await res.json();
    },
    retry: 1,
  });

  return (
    <>
      <Typography>January 1, 2006</Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={5}
      >
        <GlanceItem
          title={"Total Sleep"}
          displayContent={
            <Typography variant="h5" fontWeight="bold">
              {query.error ? "N/A" : query.data?.totalSleep}
            </Typography>
          }
          sx={{
            borderRadius: 4,
            bgcolor: "grey.100",
            color: "grey.800",
          }}
        />
        <GlanceItem
          title={"Bedtime"}
          displayContent={
            <>
              <Typography variant="h5" fontWeight="bold">
                {query.error ? "N/A" : query.data?.bedtime}
              </Typography>
            </>
          }
          sx={{
            borderRadius: 4,
            bgcolor: "grey.100",
            color: "grey.800",
          }}
        />
        <GlanceItem
          title={"Efficiency"}
          displayContent={
            <Typography variant="h4" fontWeight="bold">
              {query.error ? "N/A" : query.data?.sleepScore}
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

export default AtAGlance;
