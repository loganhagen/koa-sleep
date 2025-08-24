import { Typography, Stack } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { fetchAPI } from "@/services/apiClient";
import { useEffect, useState } from "react";

const Greeting = () => {
  const [username, setUsername] = useState("user");
  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    try {
      const res = await fetchAPI("/sleep/efficiency");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack direction={"column"} alignItems="center" sx={{ pl: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: "text.primary" }}
      >
        Good morning,
      </Typography>
      <Stack direction={"row"} spacing={1} alignItems="center">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          {username}
        </Typography>
        <WavingHandIcon color="primary" />
      </Stack>
    </Stack>
  );
};

export default Greeting;
