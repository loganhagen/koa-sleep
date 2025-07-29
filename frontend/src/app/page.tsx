"use client";

import AtAGlance from "./components/AtAGlance";
import { Box } from "@mui/material";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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
        <AtAGlance />
      </QueryClientProvider>
    </Box>
  );
};

export default Home;
