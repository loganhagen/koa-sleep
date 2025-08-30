import React from "react";
import { Stack, Paper, Skeleton } from "@mui/material";

export const WellnessIndicatorsSkeleton = () => {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
        width: "100%",
      }}
    >
      <Stack direction={"column"} spacing={1}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent={"center"}
          alignItems="center"
        >
          <Skeleton variant="text" width={220} height={40} />
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 5 }}
          paddingTop={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {[...Array(4)].map((_, index) => (
            <Stack
              key={index}
              direction={"column"}
              alignItems="center"
              spacing={1}
            >
              <Skeleton variant="circular" width={120} height={120} />
              <Skeleton variant="text" width={80} height={24} />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};
