import "./config/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import userRoutes from "@routes/userRoutes";
import authRoutes from "@routes/authRoutes";
import { swaggerSpec } from "@config/swagger";
import cookieParser from "cookie-parser";
import demoRoutes from "@routes/demoRoutes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/demo", demoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
