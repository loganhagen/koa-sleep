"use client";

import { Paper, Stack, Divider, Skeleton, Box } from "@mui/material";
import Greeting from "./Greeting";
import YourLastSleep from "./YourLastSleep";
import { useDemo } from "@/app/providers/demoProvider";
import { fetchAPI } from "@/services/apiClient";
import { DemoUser } from "@custom_types/backend/users";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const demoCtx = useDemo();

  const fetchUsername = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (demoCtx.isDemoMode) {
      const response = await fetchAPI<DemoUser>("/users/demo");
      return response.data.firstName;
    } else {
      return "User";
    }
  };

  const { data: username, isLoading } = useQuery({
    queryKey: ["username"],
    queryFn: fetchUsername,
  });

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
        <Greeting username={username} />
        <Divider orientation="vertical" flexItem />
        <YourLastSleep />
      </Stack>
    </Paper>
  );
};

export default Header;
