"use client";

import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import GlanceItem from "./GlanceItem";

const glanceData = [
  {
    id: "sleep",
    title: "Last Night's Sleep",
    displayContent: (
      <Typography variant="h5" fontWeight="bold">
        7h 30m
      </Typography>
    ),
    sx: {
      borderRadius: "50%",
      background: "linear-gradient(145deg, #6D7BFF, #4353FF)",
      color: "primary.contrastText",
      boxShadow: "0px 4px 15px rgba(67, 83, 255, 0.25)",
    },
  },
  {
    id: "bedtime",
    title: "Bedtime",
    displayContent: (
      <>
        <Typography variant="h5" fontWeight="bold">
          11:30
        </Typography>
        <Typography variant="body1">PM</Typography>
      </>
    ),
    sx: {
      borderRadius: 4,
      bgcolor: "grey.100",
      color: "grey.800",
    },
  },
  {
    id: "score",
    title: "Sleep Score",
    displayContent: (
      <Typography variant="h4" fontWeight="bold">
        75
      </Typography>
    ),
    sx: {
      borderRadius: "50%",
      background: "linear-gradient(145deg, #2CDFFF, #00A2E8)",
      color: "secondary.contrastText",
      boxShadow: "0px 4px 15px rgba(0, 162, 232, 0.25)",
    },
  },
];

const AtAGlance = () => {
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
        At a Glance
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={5}
      >
        {glanceData.map((item) => (
          <GlanceItem
            key={item.id}
            title={item.title}
            displayContent={item.displayContent}
            sx={item.sx}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default AtAGlance;
