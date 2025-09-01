import { fetchAPI } from "@/services/apiClient";
import { CoreMetrics } from "@/types/api/sleep";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchCoreMetricsByDate = async (userId: string, date: Date) => {
  const endpoint = `/users/${userId}/core-metrics/${date.toISOString()}`;
  const data = await fetchAPI<CoreMetrics>(endpoint);
  return data;
};

export const useCoreMetrics = (userId: string | undefined, date: Date) => {
  return useQuery({
    queryKey: ["core-metrics", userId, date],
    queryFn: () => {
      return fetchCoreMetricsByDate(userId!, date);
    },
    enabled: !!userId && !!date,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};
