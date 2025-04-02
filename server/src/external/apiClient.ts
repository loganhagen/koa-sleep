import { SleepAPIResponse } from "../../../types/api/sleep";
import { fetchData } from "../utils/httpClient";

export const sleepApiClient = {
  getSleepData: async (): Promise<SleepAPIResponse> => {
    return await fetchData<SleepAPIResponse>(
      "http://localhost:3001/sleep-endpoint"
    );
  },
};
