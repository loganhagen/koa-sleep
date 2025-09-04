import { NotFoundError } from "@/lib/errors";
import { fetchAPI, isNotFoundError } from "@/services/apiClient";

const fetchSleepHistory = async (userId: string) => {
  try {
    const endpoint = `/user/${userId}/comprehensive`;
    const res = fetchAPI(endpoint);
    return res;
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new NotFoundError(`No data found for ${userId}.`);
    }
    throw error;
  }
};
