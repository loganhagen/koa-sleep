import { Stack, Paper, Button, Typography, Chip, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface JourneyCardProps {
  journeyTitle: string;
  journeyDescription: string;
  isRecommended?: boolean;
  callback: () => void;
}

const JourneyCard = ({
  journeyTitle,
  journeyDescription,
  isRecommended,
  callback,
}: JourneyCardProps) => (
  <Paper
    elevation={0}
    variant="outlined"
    sx={{
      p: 4,
      borderRadius: 10,
      backgroundColor: "background.paper",
      textAlign: "left",
      maxWidth: "600px",
      width: "100%",
      borderColor: isRecommended ? "primary.main" : "divider",
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.03)",
        boxShadow: 3,
      },
      position: "relative",
    }}
  >
    {isRecommended && (
      <Tooltip title="Your bedtime usually varies by 45 minutes each night.">
        <Chip
          label="Recommended"
          color="primary"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
        />
      </Tooltip>
    )}
    <Stack spacing={3}>
      <Typography variant="h6" component="h3">
        {journeyTitle}
      </Typography>
      <Typography variant="body1">{journeyDescription}</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={callback}
        >
          Start Journey
        </Button>
        <Button variant="text">Learn More</Button>
      </Stack>
    </Stack>
  </Paper>
);

export default JourneyCard;
