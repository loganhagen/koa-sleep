import { fetchAPI } from "@/services/apiClient";
import { SmartSummaryDTO } from "@/types/api/sleep";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSmartSummaryByDate = async (userId: string, date: Date) => {
  const endpoint = `/user/${userId}/sleep/smart-summary/${date.toISOString()}`;
  const data = await fetchAPI<SmartSummaryDTO>(endpoint);
  return data;
};

export const useSmartSummary = (userId: string | undefined, date: Date) => {
  return useQuery({
    queryKey: ["smart-summary", userId, date],
    queryFn: () => {
      return fetchSmartSummaryByDate(userId!, date);
    },
    enabled: !!userId && !!date,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};
