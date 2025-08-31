import { fetchAPI, isNotFoundError } from "@/services/apiClient";
import { SleepLog } from "@/types/api/sleep";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSleepLogs = async (userId: string): Promise<SleepLog[] | null> => {
  const endpoint = `/users/${userId}/sleep`;
  const res = await fetchAPI<SleepLog[]>(endpoint);
  return res;
};

const fetchSleepLogByDate = async (
  userId: string,
  date: Date
): Promise<SleepLog | null> => {
  const dateString = date.toISOString();
  const endpoint = `/users/${userId}/sleep/${dateString}`;
  return fetchAPI<SleepLog>(endpoint).catch((err) => {
    if (isNotFoundError(err)) {
      return null;
    }
    return Promise.reject(err);
  });
};

const fetchMostRecentSleepLog = async (userId: string): Promise<SleepLog> => {
  await new Promise((f) => setTimeout(f, 1000));
  const endpoint = `/users/${userId}/sleep/recent`;
  const res = await fetchAPI<SleepLog>(endpoint);
  return res;
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
