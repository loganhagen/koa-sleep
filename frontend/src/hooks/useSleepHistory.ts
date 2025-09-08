import { NotFoundError } from "@/lib/errors";
import { fetchAPI, isNotFoundError } from "@/services/apiClient";
import { ComprehensiveSleepRecordDTO } from "@/types/api/sleep";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSleepHistory = async (userId: string) => {
  try {
    const endpoint = `/user/${userId}/comprehensive`;
    const res = fetchAPI<ComprehensiveSleepRecordDTO[]>(endpoint);
    return res;
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new NotFoundError(`No sleep history for ${userId}.`);
    }
    throw error;
  }
};

export const useSleepHistory = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["sleep-history", userId],
    queryFn: () => {
      return fetchSleepHistory(userId!);
    },
    enabled: !!userId,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};
