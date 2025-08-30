import { ApiError, fetchAPI } from "@/services/apiClient";
import {
  SleepLogAPIResponse,
  SleepLogDTO,
  SleepLogsAPIResponse,
} from "@/types/api/sleep";
import { useQuery } from "@tanstack/react-query";

const fetchSleepLogs = async (
  userId: string
): Promise<SleepLogDTO[] | null> => {
  const endpoint = `/users/${userId}/sleep`;
  const res = await fetchAPI<SleepLogsAPIResponse>(endpoint);
  return res.sleepLogs;
};

const fetchSleepLogByDate = async (
  userId: string,
  date: string
): Promise<SleepLogDTO> => {
  const endpoint = `/users/${userId}/sleep/${date}`;
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
  });
};

export const useSleepLogByDate = (userId: string, date: string) => {
  return useQuery({
    queryKey: ["sleepLog", userId, date],
    queryFn: () => fetchSleepLogByDate(userId, date),
    enabled: !!userId && !!date,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
