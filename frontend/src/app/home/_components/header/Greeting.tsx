import { Typography, Stack } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useDemo } from "../../../providers/demoProvider";
import { DemoUser } from "@custom_types/backend/users";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/services/apiClient";

const Greeting = () => {
  const demoCtx = useDemo();

  const fetchUsername = async () => {
    if (demoCtx.isDemoMode) {
      const response = await fetchAPI<DemoUser>("/users/demo");
      return response.data.firstName;
    } else {
      return "user";
    }
  };

  const { data: username } = useQuery({
    queryKey: ["username"],
    queryFn: fetchUsername,
  });

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
