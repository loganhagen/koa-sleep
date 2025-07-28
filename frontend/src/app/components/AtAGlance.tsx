"use client";

import { Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GlanceItem from "./GlanceItem";
import { LastNightSleep } from "../../../../types/backend/sleep";

const AtAGlance = () => {
  const [sleepScore, setSleepScore] = useState("...");
  const [bedtime, setBedtime] = useState("...");
  const [totalSleep, setTotalSleep] = useState("...");

  const getLastNightSleepData = async () => {
    try {
      const res = await fetch("http://localhost:5000/sleep/lastnight");
      const data = (await res.json()) as LastNightSleep;
      setSleepScore(data.sleepScore);
      setBedtime(data.bedtime);
      setTotalSleep(data.totalSleep);
    } catch (error) {
      console.log("unable to get last night's sleep data");
    }
  };

  useEffect(() => {
    getLastNightSleepData();
  }, []);

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 6,
        backgroundColor: "background.paper",
        transition: (theme) =>
          theme.transitions.create(["box-shadow", "transform"], {
            duration: theme.transitions.duration.short,
          }),
        ":hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.07)",
        },
      }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 4 }}>
        Last Night
      </Typography>

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
              {totalSleep}
            </Typography>
          }
          sx={{
            borderRadius: "50%",
            background: "linear-gradient(145deg, #6D7BFF, #4353FF)",
            color: "primary.contrastText",
            boxShadow: "0px 4px 15px rgba(67, 83, 255, 0.25)",
          }}
        />
        <GlanceItem
          title={"Bedtime"}
          displayContent={
            <>
              <Typography variant="h5" fontWeight="bold">
                {bedtime}
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
          title={"Sleep Score"}
          displayContent={
            <Typography variant="h4" fontWeight="bold">
              {sleepScore}
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
    </Paper>
  );
};

export default AtAGlance;
