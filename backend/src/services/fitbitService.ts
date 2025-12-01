import { FitbitTokenResponse } from "@custom_types/fitbit/fitbit";
import axios from "axios";

export const fitbitService = {
  exchangeCodeForTokens: async (code: string) => {
    if (code != "MOCK_CODE_12345") {
      throw new Error("Invalid code");
    }

    const client_id = process.env.FITBIT_CLIENT_ID;

    if (!client_id) {
      throw new Error("No Fitbit client ID available.");
    }

    const params = new URLSearchParams();
    params.append("code", code);
    params.append("client_id", client_id);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", "anotherCallback");

    const res = await axios.post<FitbitTokenResponse>(
      `${process.env.BACKEND_URL}/api/auth/fitbit/token`
    );
    return res.data;
  },
};
