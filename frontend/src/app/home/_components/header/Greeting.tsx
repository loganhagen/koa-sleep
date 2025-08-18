import { Typography, Stack } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";

const Greeting = () => {
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
          Denzel!
        </Typography>
        <WavingHandIcon color="primary" />
      </Stack>
    </Stack>
  );
};

export default Greeting;
