import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import LastSleepItem from "../header/LastSleepItem";

const SleepConsistency: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        mb: 2,
        borderRadius: 4,
        backgroundColor: "grey.50",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={4}>
        <LastSleepItem
          title="Sleep Consistency"
          displayContent={
            <Typography variant="h4" fontWeight="bold">
              A
            </Typography>
          }
          sx={{
            borderRadius: "50%",
            background: "linear-gradient(145deg, #288520ff, #288520ff)",
            color: "secondary.contrastText",
            boxShadow: "0px 4px 15px rgba(0, 162, 232, 0.25)",
          }}
        />
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400 }}
        >
          A high sleep consistency score means you're maintaining a regular
          sleep schedule, which is great for your circadian rhythm.
        </Typography>
      </Stack>
    </Box>
  );
};

export default SleepConsistency;
