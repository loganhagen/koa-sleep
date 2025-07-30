import { Typography, Stack } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";

const Greeting = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <WavingHandIcon color="primary" />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontFamily: "Roboto, sans-serif", color: "#333" }}
      >
        Good morning, User!
      </Typography>
    </Stack>
  );
};

export default Greeting;
