"use client";

import WeeklyInsights from "./components/weekly-insights/WeeklyInsights";
import { Box, Stack } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/header/Header";

const queryClient = new QueryClient();

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 2,
        backgroundColor: "background.default",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Stack direction={"column"} spacing={3}>
          <Header />
          <WeeklyInsights />
        </Stack>
      </QueryClientProvider>
    </Box>
  );
};

export default Home;
