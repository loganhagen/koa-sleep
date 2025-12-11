export interface FitbitTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user_id: string;
}

export interface FitbitUserProfileData {
  fullName: string;
  displayName?: string;
  firstName?: string;
}
