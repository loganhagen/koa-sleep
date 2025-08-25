"use client";

import { Paper, Stack, Divider, Skeleton, Box } from "@mui/material";
import Greeting from "./Greeting";
import YourLastSleep from "./YourLastSleep";
import { useState } from "react";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 4,
          borderRadius: 10,
          backgroundColor: "background.paper",
        }}
      >
        <Stack
          direction="row"
          spacing={0}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            direction={"column"}
            alignItems="center"
            spacing={1}
            sx={{ pl: 4, flex: 1, alignItems: "flex-start" }}
          >
            <Skeleton variant="text" width="60%" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width="40%" sx={{ fontSize: "2rem" }} />
          </Stack>

          <Divider orientation="vertical" flexItem />

          <Stack spacing={2} alignItems="center" sx={{ flex: 1.5 }}>
            <Skeleton variant="text" width="50%" sx={{ fontSize: "1.5rem" }} />
            <Box sx={{ p: 2 }} />
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="flex-start"
              spacing={5}
            >
              <Skeleton variant="rounded" width={120} height={120} />
              <Skeleton variant="rounded" width={120} height={120} />
              <Skeleton variant="circular" width={120} height={120} />
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
      }}
    >
      <Stack
        direction="row"
        spacing={0}
        alignItems="center"
        justifyContent="space-between"
      >
        <Greeting />
        <Divider orientation="vertical" flexItem />
        <YourLastSleep />
      </Stack>
    </Paper>
  );
};

export default Header;
