"use client";

import {
  Box,
  Stack,
  Typography,
  Button,
  Tooltip,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import GoogleButton from "react-google-button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import { useDemoLogin } from "@/hooks/useAuth";
import { motion } from "framer-motion";

const Splash = () => {
  const theme = useTheme();
  const currentMode = theme.palette.mode;
  const router = useRouter();
  const { mutate: loginAsDemo } = useDemoLogin();

  const handleSeeDemo = async () => {
    loginAsDemo();
    router.push("/home");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
          gap: 0,
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" }, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src="/logo-3-no-bg.png"
              alt="Koa Sleep Logo"
              width={400}
              height={400}
              style={{ maxWidth: "80%", height: "auto" }}
            />
          </motion.div>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Stack
              direction={"column"}
              spacing={2}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  fontFamily="Outfit"
                  color="text.primary"
                >
                  Koa Sleep
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="h5" color="text.secondary">
                  A clear picture of your sleep health.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ pt: 2, maxWidth: "550px" }}
                >
                  Go beyond the numbers. Transform your Fitbit data into
                  powerful visualizations. Track key metrics, discover long-term
                  trends, and gain a deeper understanding of your sleep patterns
                  to improve your daily energy and well-being.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{
                    pt: 3,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Tooltip title="Coming Soon!" arrow>
                    <Box component="span">
                      <GoogleButton
                        type={currentMode}
                        style={{
                          opacity: 0.5,
                          pointerEvents: "none",
                          width: "100%",
                        }}
                      />
                    </Box>
                  </Tooltip>
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={handleSeeDemo}
                  >
                    See a Demo
                  </Button>
                </Stack>
              </motion.div>
            </Stack>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

export default Splash;
