import {
  FitbitTokenResponse,
  FitbitUserProfileData,
} from "@custom_types/fitbit/fitbit";
import axios, { AxiosResponse } from "axios";
import qs from "qs";

const FITBIT_AUTH_URL = "https://www.fitbit.com/oauth2/authorize";
const FITBIT_TOKEN_URL = "https://api.fitbit.com/oauth2/token";
const FITBIT_PROFILE_URL = "https://api.fitbit.com/1/user/-/profile.json";

export const fitbitService = {
  getAuthorizationUrl: () => {
    const clientId = process.env.FITBIT_CLIENT_ID!;
    const redirectUri = process.env.FITBIT_REDIRECT_URI!;

    if (!clientId || !redirectUri) {
      throw new Error("Missing client ID or redirect URI.");
    }

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
      client_id: clientId,
      response_type: "code",
      scope: scopes,
      redirect_uri: redirectUri,
    });

    return `${FITBIT_AUTH_URL}?${params.toString()}`;
  },
  exchangeCodeForTokens: async (code: string) => {
    const clientId = process.env.FITBIT_CLIENT_ID;
    const clientSecret = process.env.FITBIT_CLIENT_SECRET;
    const redirectUri = process.env.FITBIT_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error("Missing Fitbit credentials or redirect URI.");
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const data = qs.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
    });

    try {
      const response: AxiosResponse<FitbitTokenResponse> = await axios.post(
        FITBIT_TOKEN_URL,
        data,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Fitbit API Error:", error.response?.data);
      } else {
        console.error("Unexpected Error:", error);
      }
      throw error;
    }
  },
  refreshAccessToken: async (
    refreshToken: string
  ): Promise<FitbitTokenResponse> => {
    const clientId = process.env.FITBIT_CLIENT_ID!;
    const clientSecret = process.env.FITBIT_CLIENT_SECRET!;
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`);
    const base64credentials = authHeader.toString("base64");

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);

    try {
      const res = await axios.post<FitbitTokenResponse>(
        FITBIT_TOKEN_URL,
        params,
        {
          headers: {
            Authorization: `Basic ${base64credentials}`,
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
  getUserProfile: async (accessToken: string) => {
    try {
      const res: AxiosResponse = await axios.get(FITBIT_PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

      return res.data.user as FitbitUserProfileData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Profile Fetch Error:",
          error.response?.status,
          error.response?.data
        );
      }
      throw error;
    }
  },
};
