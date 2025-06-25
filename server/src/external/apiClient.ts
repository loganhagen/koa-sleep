import { SleepAPIResponse } from "../../../types/api/sleep";
import { fetchData } from "../utils/httpClient";
import { JSON_SERVER_PORT, JSON_SERVER_ENDPOINT } from "../config/config";

const MOCK_SERVER_URI = `http://localhost:${JSON_SERVER_PORT}/${JSON_SERVER_ENDPOINT}`;

export const sleepApiClient = {
  // Uses the general HTTP fetch function to fetch the Sleep data from the mock API server.
  getSleepData: async (): Promise<SleepAPIResponse> => {
    return await fetchData<SleepAPIResponse>(MOCK_SERVER_URI);
  },
};
