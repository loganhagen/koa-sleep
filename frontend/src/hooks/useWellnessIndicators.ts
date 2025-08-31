import { ApiError, fetchAPI } from "@/services/apiClient";
import { TemperatureLog } from "@/types/api/wellness";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchWellnessIndicatorsByDate = async (userId: string, date: Date) => {
  const endpoint = `/users/${userId}/temperature/${date.toISOString()}`;
  const res = await fetchAPI<TemperatureLog>(endpoint);
  return res;
};

export const useWellnessIndicators = (
  userId: string | undefined,
  date: Date
) => {
  return useQuery({
    queryKey: ["wellnessIndicators", userId, date],
    queryFn: () => {
      return fetchWellnessIndicatorsByDate(userId!, date);
    },
    enabled: !!userId && !!date,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};
