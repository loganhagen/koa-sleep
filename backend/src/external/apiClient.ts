/**
 * The API layer is called by the service layer and in-turn it will
 * call the HTTP client layer to communicate with external API servers.
 */

import { fetchData } from "@utils/httpClient";

const MOCK_SERVER_URI = `http://localhost:${process.env.JSON_SERVER_PORT}/${process.env.JSON_SERVER_ENDPOINT}`;

export const sleepApiClient = {
  /** Uses the general HTTP fetch function to fetch the Sleep data from the mock API server.
   *
   */

  // TO DO: change back to getSleepData and use env variables to pass the correct URL
  getMockSleepData: async () => {
    return await fetchData(MOCK_SERVER_URI);
  },
};
