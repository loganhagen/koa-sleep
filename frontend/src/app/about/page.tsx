"use client";

import {
  Box,
  Typography,
  Paper,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { BarChart, Insights, Pageview } from "@mui/icons-material";

const AboutPage = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "2.5rem" },
          mb: { xs: 2, sm: 3 },
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        About
      </Typography>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <Typography variant="body1">
          Koa Sleep is a personal health dashboard that displays both basic and
          advanced data analysis about a user&apos;s sleep, as tracked by their
          Fitbit.
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          Features
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Pageview />
            </ListItemIcon>
            <ListItemText
              primary="View Sleep History"
              secondary="View a comprehensive list of all your sleep logs in a data grid."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText
              primary="Visualize Sleep Patterns"
              secondary="Visualize your sleep patterns and get personalized insights to understand your sleep better."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Insights />
            </ListItemIcon>
            <ListItemText
              primary="View Wellness Indicators"
              secondary="View your daily wellness indicators, such as skin temperature, breathing rate, HRV, and SpO2."
            />
          </ListItem>
        </List>
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          Contribute
        </Typography>
        <Typography variant="body1" mb={1}>
          This project is open source and I welcome contributions from the
          community. Whether you want to fix a bug, add a feature, or improve
          the documentation, your help is appreciated.
        </Typography>
        <Link
          href="https://github.com/loganhagen/koa-sleep"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </Link>
      </Paper>
    </Box>
  );
};

export default AboutPage;
