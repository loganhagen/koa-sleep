import "./initEnv";
import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger";
import sleepRoutes from "./routes/sleepRoutes";
import morgan from "morgan";
import logger from "@utils/logger";
import userRoutes from "routes/userRoutes";

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
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/sleep", sleepRoutes);
app.use("/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});

export default app;
