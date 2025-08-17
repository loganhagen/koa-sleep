import React from "react";
import { Paper, Typography, Stack } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const InsightItem = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        backgroundColor: "action.hover",
        width: "100%",
        borderStyle: "dashed",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <LightbulbOutlinedIcon color="primary" />
        <Typography variant="body1">
          Your best night was Wednesday, a day you reported{" "}
          <strong>meditating</strong>. Your worst was Saturday, after an{" "}
          <strong>Ate Late</strong> entry.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default InsightItem;
