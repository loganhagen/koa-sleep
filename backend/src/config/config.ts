import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const requiredEnvVars = [
  "EXPRESS_PORT",
  "DATABASE_URL",
  "CORS_ALLOWED_ORIGINS",
  "JWT_SECRET",
  "BACKEND_URL",
  "FRONTEND_URL",
  "FITBIT_CLIENT_ID",
  "FITBIT_CLIENT_SECRET",
  "FITBIT_REDIRECT_URI",
  "ENCRYPTION_KEY",
] as const;

type EnvVars = { [K in (typeof requiredEnvVars)[number]]: string };

function validateEnv(): EnvVars {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  if (process.env.ENCRYPTION_KEY!.length !== 64) {
    throw new Error("ENCRYPTION_KEY must be exactly 64 hex characters");
  }

  return Object.fromEntries(
    requiredEnvVars.map((key) => [key, process.env[key]!])
  ) as EnvVars;
}

export const config = validateEnv();
