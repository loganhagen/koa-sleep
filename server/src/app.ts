import express, { Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import specs from './swagger'; 
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


export default app;