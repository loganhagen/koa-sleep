import "./initEnv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import logger from "@utils/logger";
import userRoutes from "@routes/userRoutes";
import authRoutes from "@routes/authRoutes";
import { swaggerSpec } from "@config/swagger";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
