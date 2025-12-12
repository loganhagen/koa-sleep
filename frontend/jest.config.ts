import type { Config } from "jest";
import nextJest from "next/jest.js";

process.env.NEXT_PUBLIC_API_URL = "http://localhost:5000";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // "@/*": ["./src/*"]
  // "@custom_types/*": ["./src/types/*"]
};

export default createJestConfig(config);
