export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshAccessTokenResponse {
  accessToken: string;
}
