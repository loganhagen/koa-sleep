import { NotFoundError } from "@/lib/errors";
import { fetchAPI, isNotFoundError } from "@/services/apiClient";
import { WellnessIndicatorsData } from "@/types/api/wellness";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchWellnessSummaryByDate = async (userId: string, date: Date) => {
  try {
    const endpoint = `/users/${userId}/wellness-summary/${date.toISOString()}`;
    const data = await fetchAPI<WellnessIndicatorsData>(endpoint);
    return data;
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new NotFoundError("No wellness data found for the selected date.");
    }
    throw error;
  }
};

export const useWellnessIndicators = (
  userId: string | undefined,
  date: Date
) => {
  return useQuery({
    queryKey: ["wellnessSummary", userId, date],
    queryFn: () => {
      return fetchWellnessSummaryByDate(userId!, date);
    },
    enabled: !!userId && !!date,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};
