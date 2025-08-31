import React from "react";
import { Paper, Stack, Typography } from "@mui/material";

interface NoDataDisplayProps {
  title: string;
  message: string;
}

const NoDataDisplay: React.FC<NoDataDisplayProps> = ({ title, message }) => {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
        width: "100%",
        textAlign: "center",
      }}
    >
      <Stack direction={"column"} spacing={1}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent={"center"}
          alignItems="center"
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {title}
          </Typography>
        </Stack>
        <Typography>{message}</Typography>
      </Stack>
    </Paper>
  );
};

export default NoDataDisplay;
