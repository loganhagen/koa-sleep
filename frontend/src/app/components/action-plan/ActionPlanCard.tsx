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
        textAlign: "center",
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <RocketLaunchIcon sx={{ fontSize: 60, color: "info.main" }} />
        <Typography variant="h6" component="h3" sx={{ fontWeight: "bold" }}>
          Action Plan
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "left" }}
        >
          It looks like you slept okay last night, Logan. To help you get even
          better rest tonight, here are a few things you can try.
        </Typography>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem sx={{ "&:hover": { bgcolor: "action.hover" } }}>
            <ListItemIcon>
              <LocalCafeIcon color="warning" />
            </ListItemIcon>
            <ListItemText primary="Avoid caffeine after 3 PM." />
          </ListItem>
          <ListItem sx={{ "&:hover": { bgcolor: "action.hover" } }}>
            <ListItemIcon>
              <WbSunnyIcon color="warning" />
            </ListItemIcon>
            <ListItemText primary="Try to get at least 30 minutes of sunlight in the morning." />
          </ListItem>
          <ListItem sx={{ "&:hover": { bgcolor: "action.hover" } }}>
            <ListItemIcon>
              <HotelIcon color="info" />
            </ListItemIcon>
            <ListItemText primary="Consider a relaxing activity before bed, like reading or meditation." />
          </ListItem>
          <ListItem sx={{ "&:hover": { bgcolor: "action.hover" } }}>
            <ListItemIcon>
              <AccessAlarmIcon color="info" />
            </ListItemIcon>
            <ListItemText primary="Aim for a consistent bedtime and wake-up time, even on weekends." />
          </ListItem>
        </List>
      </Stack>
    </Paper>
  );
};

export default ActionPlanCard;
