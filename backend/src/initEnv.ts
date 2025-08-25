import dotenv from "dotenv";
import path from "path";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

const res = dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

if (res.error) {
  throw new Error(`Failed to initialize env variables from ${envFile}.`);
}
