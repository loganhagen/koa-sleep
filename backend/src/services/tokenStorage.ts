import prisma from "@lib/prisma";
import { encrypt, decrypt } from "@utils/encryption";
import { FitbitTokenResponse } from "@custom_types/fitbit/fitbit";
import { calculateExpirationDate } from "@utils/tokens";

export const tokenStorage = {
  /**
   * Returns DECRYPTED tokens for a user.
   * Returns null if no tokens exist.
   * * Used when we need to use the token (e.g. making an API call).
   */
  getTokens: async (userId: string) => {
    const record = await prisma.fitbit_tokens.findUnique({
      where: { user_id: userId },
    });

    if (!record) return null;

    return {
      ...record,
      access_token: decrypt(record.access_token),
      refresh_token: decrypt(record.refresh_token),
    };
  },

  /**
   * Encrypts and saves (upserts) new tokens for a user.
   * Handles expiration calculation automatically.
   * * Used immediately after receiving raw tokens from Fitbit.
   */
  saveTokens: async (userId: string, tokens: FitbitTokenResponse) => {
    const expiresAt = calculateExpirationDate(tokens.expires_in);

    return await prisma.fitbit_tokens.upsert({
      where: { user_id: userId },
      update: {
        access_token: encrypt(tokens.access_token),
        refresh_token: encrypt(tokens.refresh_token),
        expires_at: expiresAt,
      },
      create: {
        user_id: userId,
        fitbit_user_id: tokens.user_id,
        access_token: encrypt(tokens.access_token),
        refresh_token: encrypt(tokens.refresh_token),
        expires_at: expiresAt,
      },
    });
  },

  /**
   * Helper to generate the encrypted object for nested writes.
   * Useful when creating a User + Tokens in a single transaction (Prisma nested create).
   */
  getEncryptedPayload: (tokens: FitbitTokenResponse) => {
    return {
      fitbit_user_id: tokens.user_id,
      access_token: encrypt(tokens.access_token),
      refresh_token: encrypt(tokens.refresh_token),
      expires_at: calculateExpirationDate(tokens.expires_in),
    };
  },
};
