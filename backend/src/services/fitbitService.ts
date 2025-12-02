import {
  FitbitTokenResponse,
  FitbitUserProfileResponse,
} from "@custom_types/fitbit/fitbit";
import axios from "axios";

const FITBIT_TOKEN_URL = "https://api.fitbit.com/oauth2/token";
const FITBIT_AUTH_URL = "https://www.fitbit.com/oauth2/authorize";

export const fitbitService = {
  getAuthorizationUrl: () => {
    const scopes = [
      "activity",
      "cardio_fitness",
      "electrocardiogram",
      "heartrate",
      "irregular_rhythm_notifications",
      "location",
      "nutrition",
      "oxygen_saturation",
      "profile",
      "respiratory_rate",
      "settings",
      "sleep",
      "social",
      "temperature",
      "weight",
    ].join(" ");

    const params = new URLSearchParams({
      client_id: process.env.FITBIT_CLIENT_ID!,
      response_type: "code",
      scope: scopes,
      redirect_uri: process.env.FITBIT_REDIRECT_URI!,
    });

    return `${FITBIT_AUTH_URL}?${params.toString()}`;
  },
  exchangeCodeForTokens: async (code: string) => {
    const client_id = process.env.FITBIT_CLIENT_ID;

    if (!client_id) {
      throw new Error("No Fitbit client ID available.");
    }

    const params = new URLSearchParams();
    params.append("code", code);
    params.append("client_id", client_id);
    params.append("grant_type", "authorization_code");
    const redirect_uri = process.env.FITBIT_REDIRECT_URI;
    if (!redirect_uri) {
      throw new Error("No Fitbit redirect URI available.");
    }

    params.append("redirect_uri", redirect_uri);

    const res = await axios.post<FitbitTokenResponse>(
      `${process.env.BACKEND_URL}/api/auth/fitbit/token`
    );
    return res.data;
  },
  refreshAccessToken: async (
    refreshToken: string
  ): Promise<FitbitTokenResponse> => {
    const clientId = process.env.FITBIT_CLIENT_ID!;
    const clientSecret = process.env.FITBIT_CLIENT_SECRET!;
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`.toString());

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);

    try {
      const res = await axios.post<FitbitTokenResponse>(
        FITBIT_TOKEN_URL,
        params,
        {
          headers: {
            Authorization: `Basic ${authHeader}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw new Error("Failed to refresh Fitbit token");
    }
  },
  getUserProfile: async (_: string) => {
    const res = await axios.get<FitbitUserProfileResponse>(
      `${process.env.BACKEND_URL}/api/auth/fitbit/user`
    );
    return res.data;
  },
};
