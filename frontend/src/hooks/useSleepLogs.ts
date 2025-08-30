import { fetchAPI } from "@/services/apiClient";
import { SleepLogDTO, SleepLogsAPIResponse } from "@/types/api/sleep";
import { useQuery } from "@tanstack/react-query";

const fetchSleepLogs = async (userId: string): Promise<SleepLogDTO[]> => {
  const endpoint = `/sleep/get?userId=${userId}`;
  const res = await fetchAPI<SleepLogsAPIResponse>(endpoint);
  return res.sleepLogs;
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
