import "./initEnv";
import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger";
import sleepRoutes from "./routes/sleepRoutes";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/sleep", sleepRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});

export default app;
