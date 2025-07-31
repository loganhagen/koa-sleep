import {
  Paper,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import HotelIcon from "@mui/icons-material/Hotel";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

const ActionPlanCard = () => {
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
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <RocketLaunchIcon sx={{ fontSize: 60, color: "info.main" }} />
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Action Plan
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "left", width: "100%" }}
        >
          It looks like you slept okay last night, Logan. To help you get even
          better rest tonight, here are a few things you can try.
        </Typography>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem sx={{ "&:hover": { bgcolor: "action.hover" } }}>
            <ListItemIcon>
              <LocalCafeIcon color="warning" />
            </ListItemIcon>
            <ListItemText>
              Avoid caffeine after 3 PM today.<sup>1</sup>
            </ListItemText>
          </ListItem>
          <ListItem sx={{ "&:hover": { bgcolor: "action.hover" } }}>
            <ListItemIcon>
              <WbSunnyIcon color="warning" />
            </ListItemIcon>
            <ListItemText>
              Get at least 30 minutes of sunlight before 9 AM this morning.
              <sup>2</sup>
            </ListItemText>
          </ListItem>
          <ListItem sx={{ "&:hover": { bgcolor: "action.hover" } }}>
            <ListItemIcon>
              <HotelIcon color="info" />
            </ListItemIcon>
            <ListItemText>
              Consider a relaxing activity before bed, like reading or
              meditation before 9:30PM tonight.<sup>3</sup>
            </ListItemText>
          </ListItem>
          <ListItem sx={{ "&:hover": { bgcolor: "action.hover" } }}>
            <ListItemIcon>
              <AccessAlarmIcon color="info" />
            </ListItemIcon>
            <ListItemText>
              Avoid screen usage after 9 PM tonight.
              <sup>4</sup>
            </ListItemText>
          </ListItem>
        </List>
        <Stack direction="column" spacing={1} sx={{ width: "100%", pt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            References
          </Typography>
          <Typography variant="caption" color="text.secondary">
            <sup>1</sup> Real, N., et al. (2015). The role of sleep hygiene in
            promoting public health. *Sleep Medicine Reviews*.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            <sup>2</sup> National Institute of Neurological Disorders and
            Stroke. (2023). *Brain Basics: Understanding Sleep*.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            <sup>3</sup> Real, N., et al. (2015). The role of sleep hygiene in
            promoting public health. *Sleep Medicine Reviews*.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            <sup>4</sup> National Institute of Neurological Disorders and
            Stroke. (2023). *Brain Basics: Understanding Sleep*.
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ActionPlanCard;
