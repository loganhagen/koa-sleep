"use client";

import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  useMediaQuery,
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
  const [feeling, setFeeling] = useState<string | null>("3");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFeelingChange = (
    event: React.MouseEvent<HTMLElement>,
    newFeeling: string | null
  ) => {
    if (newFeeling !== null) {
      setFeeling(newFeeling);
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setFeeling(String(newValue as number));
  };

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
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={"center"}
          paddingBottom={3}
          spacing={{ xs: 2, sm: 0 }}
        >
          <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }} />
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Daily Check-In
            </Typography>
            <CheckIcon sx={{ fontSize: 30, color: "green" }} />
          </Stack>
          <Box
            sx={{
              flex: 1,
              width: "100%",
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
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
            {isMobile ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <ToggleButtonGroup
                  value={feeling}
                  exclusive
                  onChange={handleFeelingChange}
                  aria-label="Feeling"
                  disabled={sliderDisabled}
                >
                  <ToggleButton value="1" aria-label="feeling 1">
                    1
                  </ToggleButton>
                  <ToggleButton value="2" aria-label="feeling 2">
                    2
                  </ToggleButton>
                  <ToggleButton value="3" aria-label="feeling 3">
                    3
                  </ToggleButton>
                  <ToggleButton value="4" aria-label="feeling 4">
                    4
                  </ToggleButton>
                  <ToggleButton value="5" aria-label="feeling 5">
                    5
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <SentimentVeryDissatisfiedIcon />
                <Slider
                  aria-label="Feeling"
                  value={Number(feeling)}
                  onChange={handleSliderChange}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  disabled={sliderDisabled}
                />
                <SentimentVerySatisfiedIcon />
              </Stack>
            )}
          </Box>
          <Box>
            {isMobile ? (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "medium" }}
                textAlign={"center"}
                gutterBottom
              >
                What activities did you engage in yesterday?
              </Typography>
            ) : (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "medium" }}
                gutterBottom
              >
                What activities did you engage in yesterday?
              </Typography>
            )}

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              justifyContent={{ xs: "center", sm: "flex-start" }}
              alignItems="center"
            >
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
          <Stack
            direction={"row"}
            spacing={1}
            justifyContent={{ xs: "center", sm: "flex-end" }}
          >
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
