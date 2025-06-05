import { SleepAPIResponse } from "../../../types/api/sleep";
import { fetchData } from "../utils/httpClient";
import { MOCK_SERVER } from "../config/config";

export const sleepApiClient = {
  getSleepData: async (): Promise<SleepAPIResponse> => {
    return await fetchData<SleepAPIResponse>(MOCK_SERVER);
  },
};
