import { Paper, Stack, Typography, Box, Chip } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useSmartSummary } from "@/hooks/useSmartSummary";
import { useUser } from "@/providers/userProvider";

interface SmartSummaryProps {
  targetDate: Date;
}

const SmartSummary: React.FC<SmartSummaryProps> = ({ targetDate }) => {
  const { user } = useUser();
    const { data, isLoading, error, isPlaceholderData } = useSmartSummary(
      user?.id,
      targetDate
    );


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
      <Stack direction="column" spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={"center"}
          paddingBottom={3}
          spacing={{ xs: 2, sm: 0 }}
        >
          <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }} />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems="center"
          >
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Smart Summary
            </Typography>
            <AutoAwesomeIcon sx={{ fontSize: 30, color: "info.main" }} />
          </Stack>
          <Box
            sx={{
              flex: 1,
              width: "100%",
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            <Chip label="Powered by AI" color="info" variant="filled" />
          </Box>
        </Stack>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          {data?.summary || "Smart summary unavailable for current date."}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default SmartSummary;