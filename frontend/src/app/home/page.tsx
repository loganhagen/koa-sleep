"use client";

import { CircularProgress, Box } from "@mui/material";
import { useUser } from "../../providers/userProvider";
import DashboardContent from "./_components/DashboardContent";

const Home = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <div>Please log in.</div>;
  }

  return <DashboardContent user={user} />;
};

export default Home;
