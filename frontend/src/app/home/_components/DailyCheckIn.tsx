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
import { useState } from "react";

type Activity = {
  label: string;
  color:
    | "warning"
    | "error"
    | "success"
    | "primary"
    | "info"
    | "default"
    | "secondary";
  selected: boolean;
};

const initialActivities: Activity[] = [
  { label: "Late Coffee", color: "warning", selected: false },
  { label: "Stressful Day", color: "error", selected: false },
  { label: "Meditation", color: "success", selected: false },
  { label: "Exercised", color: "primary", selected: false },
  { label: "Ate Late", color: "warning", selected: false },
  { label: "Good Meal", color: "info", selected: false },
];

const DailyCheckIn = () => {
  const [sliderDisabled, setSliderDisabled] = useState(true);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const handleEditClick = () => {
    setSliderDisabled(false);
  };

  const handleSaveClick = () => {
    setSliderDisabled(true);
    console.log(
      "Selected activities:",
      activities.filter((a) => a.selected)
    );
  };

  const handleActivityToggle = (labelToToggle: string) => {
    if (sliderDisabled) return;

    setActivities(
      activities.map((activity) =>
        activity.label === labelToToggle
          ? { ...activity, selected: !activity.selected }
          : activity
      )
    );
  };

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
      <Stack direction={"column"} spacing={3}>
        {/* Title */}
        <Stack direction={"row"} alignItems={"center"} paddingBottom={3}>
          <Box sx={{ flex: 1 }} />
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Daily Check-In
            </Typography>
            <CheckIcon sx={{ fontSize: 30, color: "green" }} />
          </Stack>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Chip label="Coming Soon!" color="info" variant="filled" />
          </Box>
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
                disabled={sliderDisabled}
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
              {activities.map((activity) => (
                <Chip
                  key={activity.label}
                  label={activity.label}
                  variant={activity.selected ? "filled" : "outlined"}
                  color={activity.color}
                  onClick={() => handleActivityToggle(activity.label)}
                  sx={{
                    ...(!sliderDisabled && {
                      "&:hover": {
                        filter: "brightness(90%)",
                        cursor: "pointer",
                      },
                    }),
                  }}
                />
              ))}
            </Stack>
          </Box>
          <Stack direction={"row"} spacing={1} justifyContent={"right"}>
            <Button
              variant="contained"
              onClick={handleEditClick}
              disabled={!sliderDisabled}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveClick}
              disabled={sliderDisabled}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DailyCheckIn;
