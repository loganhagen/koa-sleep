import { ApiError, fetchAPI } from "@/services/apiClient";
import { SkinTempAPIResponse } from "@/types/api/wellness";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchWellnessIndicatorsByDate = async (userId: string, date: Date) => {
  const endpoint = `/users/${userId}/temperature/${date.toISOString()}`;
  const res = await fetchAPI<SkinTempAPIResponse>(endpoint);
  return res.log;
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
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    placeholderData: keepPreviousData,
  });
};
