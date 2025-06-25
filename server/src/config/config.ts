function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export const JSON_SERVER_PORT = getEnv("JSON_SERVER_PORT");
export const JSON_SERVER_ENDPOINT = getEnv("JSON_SERVER_ENDPOINT");
export const EXPRESS_PORT = getEnv("EXPRESS_PORT");
