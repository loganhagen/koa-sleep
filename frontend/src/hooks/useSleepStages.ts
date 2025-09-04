import { NotFoundError } from "@/lib/errors";
import { fetchAPI, isNotFoundError } from "@/services/apiClient";
import { SleepStagesDTO } from "@/types/api/sleep";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSleepStagesByDate = async (userId: string, date: Date) => {
  try {
    const endpoint = `/user/${userId}/sleep-stages/${date.toISOString()}`;
    const data = await fetchAPI<SleepStagesDTO>(endpoint);
    return data;
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new NotFoundError(
        "No sleep stage data found for the selected date."
      );
    }
    throw error;
  }
};

export const useSleepStages = (userId: string | undefined, date: Date) => {
  return useQuery({
    queryKey: ["sleep-stages", userId, date],
    queryFn: () => {
      return fetchSleepStagesByDate(userId!, date);
    },
    enabled: !!userId && !!date,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};
