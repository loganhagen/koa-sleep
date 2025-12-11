const EXPIRATION_BUFFER_MINUTES = 5;

export const calculateExpirationDate = (expiresInSeconds: number): Date => {
  return new Date(Date.now() + expiresInSeconds * 1000);
};

export const isTokenExpired = (expiresAt: Date | string): boolean => {
  const expiryTime = new Date(expiresAt).getTime();
  const bufferMs = EXPIRATION_BUFFER_MINUTES * 60 * 1000;

  return expiryTime - bufferMs <= Date.now();
};
