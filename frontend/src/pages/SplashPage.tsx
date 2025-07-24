import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sleepThread } from "../../utils/utils";
import { useState } from "react";

export default function WelcomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsLoading(true);
    await sleepThread(1000);
    navigate("/dashboard");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Stack
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography sx={{ mb: 1 }}>Connecting to API server...</Typography>
          <CircularProgress />
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack direction="column">
        <Typography sx={{ mb: 1, textAlign: "center" }}>
          Fitness Dashboard
        </Typography>
        <Stack direction="column" spacing={1}>
          <TextField variant="standard" label="username"></TextField>
          <TextField variant="standard" label="password"></TextField>
        </Stack>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ mt: 2, maxWidth: 100 }}
        >
          Log-in
        </Button>
      </Stack>
    </Box>
  );
}
