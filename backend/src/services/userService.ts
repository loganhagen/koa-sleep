import prisma from "@lib/prisma";
import { FullSleepLog } from "@custom_types/db/db";
import { users } from "@prisma/client";
import {
  FitbitUserProfileData,
  FitbitTokenResponse,
} from "@custom_types/fitbit/fitbit";
import { fitbitService } from "./fitbitService";
import { isTokenExpired } from "@utils/tokens";
import { tokenStorage } from "./tokenStorage";
import { Mutex } from "async-mutex";

const refreshMutexes = new Map<string, Mutex>();

export const userService = {
  addUser: async (
    userDetails: FitbitUserProfileData,
    userTokens: FitbitTokenResponse
  ): Promise<users> => {
    const tokenData = tokenStorage.getEncryptedPayload(userTokens);

    const newUser = await prisma.users.create({
      data: {
        first_name: userDetails.firstName,
        display_name: userDetails.displayName,
        full_name: userDetails.fullName,
        fitbitTokens: {
          create: tokenData,
        },
      },
      include: {
        fitbitTokens: true,
      },
    });

    return newUser;
  },

  findOrCreateFromFitbit: async (rawTokens: FitbitTokenResponse) => {
    const existingToken = await prisma.fitbit_tokens.findUnique({
      where: { fitbit_user_id: rawTokens.user_id },
      include: { users: true },
    });

    if (existingToken) {
      await tokenStorage.saveTokens(existingToken.user_id, rawTokens);
      return existingToken.users;
    }

    const userProfile = await fitbitService.getUserProfile(
      rawTokens.access_token
    );

    return await userService.addUser(userProfile, rawTokens);
  },

  // Will refresh the token if needed.
  getValidAccessToken: async (userId: string) => {
    // Register the user id within the mutex map.
    if (!refreshMutexes.has(userId)) {
      refreshMutexes.set(userId, new Mutex());
    }

    const mutex = refreshMutexes.get(userId)!;

    // Ensure only one
    return await mutex.runExclusive(async () => {
      const tokens = await tokenStorage.getTokens(userId);

      if (!tokens) {
        throw new Error("User has no Fitbit tokens connected.");
      }

      if (!isTokenExpired(tokens.expires_at)) {
        return tokens.access_token;
      }

      try {
        const newTokens = await fitbitService.refreshAccessToken(
          tokens.refresh_token
        );

        await tokenStorage.saveTokens(userId, newTokens);

        return newTokens.access_token;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        console.error("Failed to refresh token:", msg);
        throw new Error(
          "Failed to refresh token. User may need to re-authenticate."
        );
      }
    });
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
