"use client";

import * as React from "react";
import { Paper, Stack, Skeleton, Box, Divider } from "@mui/material";

const SleepStagesSkeleton: React.FC = () => {
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
          <Skeleton variant="text" width={150} height={40} />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Box
            sx={{ width: { xs: 250, sm: 250 }, height: { xs: 250, sm: 250 } }}
          >
            <Skeleton variant="circular" width={250} height={250} />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />
          <Stack direction={"column"} spacing={1}>
            {[...Array(4)].map((_, index) => (
              <Stack key={index} direction="row" alignItems="center">
                <Skeleton variant="text" width={80} height={24} />
                <Skeleton
                  variant="text"
                  width={100}
                  height={20}
                  sx={{ ml: 2 }}
                />
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Skeleton variant="text" width={"80%"} height={20} sx={{ mt: 2, alignSelf: "center" }} />
      </Stack>
    </Paper>
  );
};

export default SleepStagesSkeleton;