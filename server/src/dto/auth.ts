export interface GoogleLoginReqDto {
  accessToken: string
}

export interface SignUpReqDto {
  username: string,
  password: string,
  email: string,
  name: string
}

export interface Tokens {
  accessToken: string;
  refreshToken: string
}

export interface RefreshTokenReqDto {
  userId: number;
  refreshToken: string
}
