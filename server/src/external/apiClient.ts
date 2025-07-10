/**
 * The API layer is called by the service layer and in-turn it will
 * call the HTTP client layer to communicate with external API servers.
 */

import { FitbitData } from "@custom_types/api/sleep";
import { fetchData } from "@utils/httpClient";
import { JSON_SERVER_PORT, JSON_SERVER_ENDPOINT } from "../config/config";

const MOCK_SERVER_URI = `http://localhost:${JSON_SERVER_PORT}/${JSON_SERVER_ENDPOINT}`;

export const sleepApiClient = {
  // Uses the general HTTP fetch function to fetch the Sleep data from the mock API server.
  getSleepData: async (): Promise<FitbitData> => {
    return await fetchData<FitbitData>(MOCK_SERVER_URI);
  },
};
