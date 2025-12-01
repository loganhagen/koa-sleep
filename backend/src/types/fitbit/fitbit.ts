export interface FitbitTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user_id: string;
}

export interface FitbitUserProfileResponse {
  user: UserProfileData;
}

export interface UserProfileData {
  displayName?: string;
  firstName?: string;
  fullName: string;
}
