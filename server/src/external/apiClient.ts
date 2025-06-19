import { SleepAPIResponse } from "../../../types/api/sleep";
import { fetchData } from "../utils/httpClient";
import { MOCK_SERVER } from "../config/config";

export const sleepApiClient = {
  // Uses the general HTTP fetch function to fetch the Sleep data from the mock API server.
  getSleepData: async (): Promise<SleepAPIResponse> => {
    return await fetchData<SleepAPIResponse>(MOCK_SERVER);
  },
};
