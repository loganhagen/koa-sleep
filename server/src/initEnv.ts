// This is a helper file to initialize environment variables using .env.

import dotenv from "dotenv";

const res = dotenv.config();

if (res.error) {
  throw new Error("Failed to initialize env variables.");
}
