"use client";

import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import CheckIcon from "@mui/icons-material/Check";

const DailyCheckIn = () => {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
        textAlign: "left",
      }}
    >
      <Stack spacing={3}>
        <Stack direction={"row"} spacing={1} justifyContent={"center"}>
          <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
            Daily Check-In
          </Typography>
          <CheckIcon sx={{ fontSize: 40, color: "green" }} />
        </Stack>

        <Stack spacing={2} divider={<Divider flexItem />}>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "medium" }}
              gutterBottom
            >
              How are you feeling today?
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <SentimentVeryDissatisfiedIcon />
              <Slider
                aria-label="Feeling"
                defaultValue={3}
                step={1}
                marks
                min={1}
                max={5}
              />
              <SentimentVerySatisfiedIcon />
            </Stack>
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "medium" }}
              gutterBottom
            >
              What activities did you engage in yesterday?
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Chip label="Late Coffee" variant="outlined" color="warning" />
              <Chip label="Stressful Day" variant="outlined" color="error" />
              <Chip label="Meditation" variant="outlined" color="success" />
              <Chip label="Exercised" variant="outlined" color="primary" />
              <Chip label="Ate Late" variant="outlined" color="warning" />
              <Chip label="Good Meal" variant="outlined" color="info" />
            </Stack>
          </Box>
          <Stack direction={"row"} spacing={1} justifyContent={"right"}>
            <Button variant="contained">Edit</Button>
            <Button variant="contained">Save</Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DailyCheckIn;
