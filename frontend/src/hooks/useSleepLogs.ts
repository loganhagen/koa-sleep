import { ApiError, fetchAPI } from "@/services/apiClient";
import {
  SleepLogAPIResponse,
  SleepLogDTO,
  SleepLogsAPIResponse,
} from "@/types/api/sleep";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSleepLogs = async (
  userId: string
): Promise<SleepLogDTO[] | null> => {
  const endpoint = `/users/${userId}/sleep`;
  const res = await fetchAPI<SleepLogsAPIResponse>(endpoint);
  return res.sleepLogs;
};

const fetchSleepLogByDate = async (
  userId: string,
  date: Date
): Promise<SleepLogDTO> => {
  const endpoint = `/users/${userId}/sleep/${date.toISOString()}`;
  const res = await fetchAPI<SleepLogAPIResponse>(endpoint);
  return res.sleepLog;
};

const fetchMostRecentSleepLog = async (
  userId: string
): Promise<SleepLogDTO> => {
  await new Promise((f) => setTimeout(f, 1000));
  const endpoint = `/users/${userId}/sleep/recent`;
  const res = await fetchAPI<SleepLogAPIResponse>(endpoint);
  return res.sleepLog;
};

export const useSleepLogs = (userId: string) => {
  return useQuery({
    queryKey: ["sleepLogs", userId],
    queryFn: ({ queryKey }) => {
      const [, userId] = queryKey;
      return fetchSleepLogs(userId as string);
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

export const useMostRecentSleepLog = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["mostRecentSleepLog", userId],
    queryFn: () => fetchMostRecentSleepLog(userId!),
    enabled: !!userId,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};
