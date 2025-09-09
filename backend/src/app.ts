import "./initEnv";
import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import logger from "@utils/logger";
import userRoutes from "@routes/userRoutes";
import { swaggerSpec } from "@config/swagger";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
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
app.use("/api/user", userRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
  res.send(`API docs available at http://localhost:${PORT}/api/docs`);
});

export default app;
