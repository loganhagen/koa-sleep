import { NotFoundError } from "@/lib/errors";
import { fetchAPI, isNotFoundError } from "@/services/apiClient";
import { SmartSummaryDTO } from "@/types/api/sleep";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSmartSummaryByDate = async (userId: string, date: Date) => {
  try {
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 750));
    const endpoint = `/user/${userId}/sleep/smart-summary/${date.toISOString()}`;
    const data = await fetchAPI<SmartSummaryDTO>(endpoint);
    return data;
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new NotFoundError(
        "Smart summary unavailable for the selected date."
      );
    }
    throw error;
  }
};

export const useSmartSummary = (userId: string | undefined, date: Date) => {
  return useQuery({
    queryKey: ["smart-summary", userId, date],
    queryFn: () => {
      return fetchSmartSummaryByDate(userId!, date);
    },
    enabled: !!userId && !!date,
    retry: 0,
    // placeholderData: keepPreviousData,
  });
};
