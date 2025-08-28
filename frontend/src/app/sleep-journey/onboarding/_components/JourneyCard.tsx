import { Stack, Paper, Button, Typography, Chip, Tooltip, Box } from "@mui/material";
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
      p: { xs: 3, sm: 4 },
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
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" component="h3" sx={{ pr: { sm: "140px" } }}>
          {journeyTitle}
        </Typography>
        {isRecommended && (
          <Tooltip title="Your bedtime usually varies by 45 minutes each night.">
            <Chip
              label="Recommended"
              color="primary"
              sx={{
                position: { xs: "static", sm: "absolute" },
                top: { sm: 32 },
                right: { sm: 32 },
                mt: { xs: 1, sm: 0 },
              }}
            />
          </Tooltip>
        )}
      </Box>
      <Typography variant="body1">{journeyDescription}</Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
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