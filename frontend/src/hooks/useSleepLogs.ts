import { NotFoundError } from "@/lib/errors";
import { fetchAPI, isNotFoundError } from "@/services/apiClient";
import { FullSleepLogDTO, SleepLogDTO } from "@/types/api/sleep";
import { SleepLog } from "@/types/ui/sleep";
import { toSleepLog } from "@/utils/mappers";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchFullLogs = async (userId: string) => {
  const endpoint = `/user/${userId}/full-logs`;

  try {
    const data = await fetchAPI<FullSleepLogDTO[]>(endpoint);
    return data;
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new NotFoundError(`No full logs found for ${userId}.`);
    }
    throw error;
  }
};

const fetchSleepLogs = async (userId: string): Promise<SleepLog[] | null> => {
  const endpoint = `/user/${userId}/sleep`;
  const res = await fetchAPI<SleepLogDTO[]>(endpoint);
  const logs = res.map(toSleepLog);
  return logs;
};

const fetchSleepLogByDate = async (userId: string, date: Date) => {
  try {
    const endpoint = `/users/${userId}/sleep/${date.toISOString()}`;
    const data = await fetchAPI<SleepLogDTO>(endpoint);
    return data;
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new NotFoundError(`No sleep log found for ${date.toISOString()}.`);
    }
    throw error;
  }
};

const fetchMostRecentSleepLog = async (userId: string) => {
  try {
    const endpoint = `/user/${userId}/sleep/recent`;
    const data = await fetchAPI<SleepLogDTO>(endpoint);
    return data;
  } catch (error) {
    throw error;
  }
};

export const useFullLogs = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["full-logs", userId],
    queryFn: () => {
      return fetchFullLogs(userId!);
    },
    enabled: !!userId,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};

export const useSleepLogs = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["sleepLogs", userId],
    queryFn: () => {
      return fetchSleepLogs(userId!);
    },
    enabled: !!userId,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};

export const useSleepLogByDate = (userId: string | undefined, date: Date) => {
  return useQuery({
    queryKey: ["sleepLog", userId, date],
    queryFn: () => {
      return fetchSleepLogByDate(userId!, date);
    },
    enabled: !!userId && !!date,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};

export const useMostRecentSleepLog = (userId: string) => {
  return useQuery({
    queryKey: ["mostRecentSleepLog", userId],
    queryFn: () => fetchMostRecentSleepLog(userId),
    enabled: !!userId,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};
