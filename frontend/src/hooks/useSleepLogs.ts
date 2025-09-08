import { NotFoundError } from "@/lib/errors";
import { fetchAPI, isNotFoundError } from "@/services/apiClient";
import { SleepLogDTO } from "@/types/api/sleep";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSleepLogs = async (
  userId: string
): Promise<SleepLogDTO[] | null> => {
  const endpoint = `/user/${userId}/sleep`;
  const res = await fetchAPI<SleepLogDTO[]>(endpoint);
  return res;
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

export const useMostRecentSleepLog = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["mostRecentSleepLog", userId],
    queryFn: () => fetchMostRecentSleepLog(userId!),
    enabled: !!userId,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};
