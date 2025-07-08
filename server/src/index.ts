import app from "./app";
import { EXPRESS_PORT } from "./config/config";

app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
  console.log(`Check /docs for available endpoints.`);
});
