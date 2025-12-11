import {
  FitbitTokenResponse,
  FitbitUserProfileData,
} from "@custom_types/fitbit/fitbit";
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
} from "@utils/encryption";
import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { config } from "../config/config";

const FITBIT_AUTH_URL = "https://www.fitbit.com/oauth2/authorize";
const FITBIT_TOKEN_URL = "https://api.fitbit.com/oauth2/token";
const FITBIT_PROFILE_URL = "https://api.fitbit.com/1/user/-/profile.json";

export const fitbitService = {
  getAuthorizationUrl: () => {
    const clientId = config.FITBIT_CLIENT_ID;
    const redirectUri = config.FITBIT_REDIRECT_URI;
    const state = generateState();
    const verifier = generateCodeVerifier();
    const challenge = generateCodeChallenge(verifier);

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
      state: state,
      code_challenge: challenge,
      code_challenge_method: "S256",
    });

    return {
      url: `${FITBIT_AUTH_URL}?${params.toString()}`,
      state,
      verifier,
    };
  },

  exchangeCodeForTokens: async (code: string, code_verifier: string) => {
    const clientId = config.FITBIT_CLIENT_ID;
    const clientSecret = config.FITBIT_CLIENT_SECRET;
    const redirectUri = config.FITBIT_REDIRECT_URI;

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const data = qs.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: code_verifier,
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
          timeout: 10000,
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Fitbit API Error:", {
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error("Unexpected Error during token exchange");
      }
      throw error;
    }
  },

  refreshAccessToken: async (
    refreshToken: string
  ): Promise<FitbitTokenResponse> => {
    const clientId = config.FITBIT_CLIENT_ID;
    const clientSecret = config.FITBIT_CLIENT_SECRET;

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const data = qs.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    try {
      const res = await axios.post<FitbitTokenResponse>(
        FITBIT_TOKEN_URL,
        data,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 10000,
        }
      );
      return res.data;
    } catch (error) {
      const msg = axios.isAxiosError(error)
        ? error.response?.data
        : "Unknown error";
      console.error("Failed to refresh token:", msg);
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
        console.error("Profile Fetch Error:", {
          status: error.response?.status,
          data: error.response?.data,
        });
      }
      throw error;
    }
  },
};
