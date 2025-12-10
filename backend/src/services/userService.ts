import prisma from "@lib/prisma";
import { FullSleepLog } from "@custom_types/db/db";
import { users } from "@prisma/client";
import {
  FitbitUserProfileData,
  FitbitTokenResponse,
} from "@custom_types/fitbit/fitbit";
import { fitbitService } from "./fitbitService";
import { decrypt, encrypt } from "@utils/encryption";
import { calculateExpirationDate, isTokenExpired } from "@utils/tokens";

export const userService = {
  addUser: async (
    userDetails: FitbitUserProfileData,
    userTokens: FitbitTokenResponse
  ): Promise<users> => {
    const expiresAt = calculateExpirationDate(userTokens.expires_in);

    const newUser = await prisma.users.create({
      data: {
        first_name: userDetails.firstName,
        display_name: userDetails.displayName,
        full_name: userDetails.fullName,

        fitbitTokens: {
          create: {
            fitbit_user_id: userTokens.user_id,
            access_token: encrypt(userTokens.access_token),
            refresh_token: encrypt(userTokens.refresh_token),
            expires_at: expiresAt,
          },
        },
      },

      include: {
        fitbitTokens: true,
      },
    });

    return newUser;
  },

  findOrCreateFromFitbit: async (userTokens: FitbitTokenResponse) => {
    // Look for the tokens in the database.
    const existingToken = await prisma.fitbit_tokens.findUnique({
      where: { fitbit_user_id: userTokens.user_id },
      include: { users: true },
    });

    const expiresAt = calculateExpirationDate(userTokens.expires_in);

    // Replace the existing user's tokens with the new tokens and return.
    if (existingToken) {
      await prisma.fitbit_tokens.update({
        where: { id: existingToken.id },
        data: {
          access_token: encrypt(userTokens.access_token),
          refresh_token: encrypt(userTokens.refresh_token),
          expires_at: expiresAt,
        },
      });
      return existingToken.users;
    }

    const userProfile = await fitbitService.getUserProfile(
      userTokens.access_token
    );

    // Create a new user using the tokens and user profile.
    return await userService.addUser(userProfile, userTokens);
  },

  // Refresh the access token if expired.
  getValidAccessToken: async (userId: string) => {
    const tokenRecord = await prisma.fitbit_tokens.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!tokenRecord) {
      throw new Error("User has no Fitbit tokens connected.");
    }

    const now = new Date();
    const fiveMinutes = 5 * 60 * 1000;
    const expiresAt = new Date(tokenRecord.expires_at).getTime();

    if (!isTokenExpired(tokenRecord.expires_at)) {
      return decrypt(tokenRecord.access_token);
    }

    try {
      const currentRefreshToken = tokenRecord.refresh_token;
      const newTokens = await fitbitService.refreshAccessToken(
        currentRefreshToken
      );
      const newExpiresAt = calculateExpirationDate(newTokens.expires_in);

      await prisma.fitbit_tokens.update({
        where: { id: tokenRecord.id },
        data: {
          access_token: encrypt(newTokens.access_token),
          refresh_token: encrypt(newTokens.refresh_token),
          expires_at: newExpiresAt,
        },
      });

      return newTokens.access_token;
    } catch (err) {
      console.error("Failed to refresh token:", err);
      throw new Error(
        "Failed to refresh token. User may need to re-authenticate."
      );
    }
  },

  getUserById: async (id: string): Promise<users | null> => {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    return user;
  },

  getUserByFitbitId: async (fitbitId: string): Promise<users | null> => {
    const tokenRecord = await prisma.fitbit_tokens.findUnique({
      where: {
        fitbit_user_id: fitbitId,
      },
      include: {
        users: true,
      },
    });

    return tokenRecord?.users || null;
  },

  getUserByEmail: async (email: string): Promise<users | null> => {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  },

  getFullSleepLogs: async (user_id: string): Promise<FullSleepLog[]> => {
    const [
      sleepLogs,
      skinTemps,
      breathingRates,
      hrVariabilities,
      spo2Readings,
    ] = await Promise.all([
      prisma.sleep_logs.findMany({
        where: { user_id },
        orderBy: { date: "desc" },
      }),
      prisma.skin_temperatures.findMany({ where: { user_id } }),
      prisma.breathing_rates.findMany({ where: { user_id } }),
      prisma.heart_rate_variabilities.findMany({ where: { user_id } }),
      prisma.spo2_readings.findMany({ where: { user_id } }),
    ]);

    const getDateKey = (date: Date) => date.toISOString().split("T")[0];

    const skinTempMap = new Map(
      skinTemps.map((item) => [getDateKey(item.date), item.average])
    );
    const breathingRateMap = new Map(
      breathingRates.map((item) => [getDateKey(item.date), item.breathing_rate])
    );
    const hrvMap = new Map(
      hrVariabilities.map((item) => [getDateKey(item.date), item.daily_rmssd])
    );
    const spo2Map = new Map(
      spo2Readings.map((item) => [getDateKey(item.date), item.avg])
    );

    const combinedLogs = sleepLogs.map((sleepLog) => {
      const dateKey = getDateKey(sleepLog.date);

      return {
        id: sleepLog.id,
        user_id: sleepLog.user_id,
        date: sleepLog.date,
        bed_time: sleepLog.bed_time,
        wake_time: sleepLog.wake_time,
        duration_ms: sleepLog.duration_ms,
        efficiency: sleepLog.efficiency,
        awake_mins: sleepLog.awake_mins,
        light_mins: sleepLog.light_mins,
        deep_mins: sleepLog.deep_mins,
        rem_mins: sleepLog.rem_mins,
        skin_temperature: skinTempMap.get(dateKey) ?? null,
        breathing_rate: breathingRateMap.get(dateKey) ?? null,
        hrv: hrvMap.get(dateKey) ?? null,
        spo2: spo2Map.get(dateKey) ?? null,
      };
    });
    return combinedLogs;
  },
};
