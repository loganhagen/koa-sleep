import * as React from "react";
import { Paper, Stack, Skeleton, Divider } from "@mui/material";

export const SleepStagesSkeleton = () => {
  return (
    <Paper
      elevation={11}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
      }}
    >
      <Stack direction={"column"} spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent={"center"}
          alignItems="center"
        >
          <Skeleton variant="text" width={180} height={40} />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Skeleton variant="circular" width={250} height={250} />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />
          <Stack direction={"column"} spacing={1.5}>
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} variant="text" width={150} height={24} />
            ))}
          </Stack>
        </Stack>

        <Stack alignItems="center" sx={{ mt: 2 }}>
          <Skeleton variant="text" width="80%" height={20} />
        </Stack>
      </Stack>
    </Paper>
  );
};
