export const loadEnvVariables = () => ({
  // App info
  PORT: Number(process.env.PORT) || 3001,
  APP_NAME: process.env.APP_NAME || 'app_name',
  API_PREFIX: process.env.API_PREFIX || '/api',

  // Jwt Secrets
  JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY || 'Wv9r63DcCCuCgI0Rvp9dShHj9bhnLPs910+bYYRNmqBTvNLLUHxvFrCNdhu6lUoq/hBgVksoSPNqrbRdWYIaXC54EvW0fM3PQn6LFC45F2+pAJYLYeucGbc+AaWQumWp2p1cEhQXSiRWHk096Y520+/8EfiM0z1iaJzbTTxzZc4x8z/GEMM24qRduxGmUqpK5I3l7qwNHDVHkMixztMYXkxKcP2FrkCodGMu3vjHsqNLeMneCgxmZNmtwvC3L/+QK5VnevZxGhzov8iVIpJCugXnaK7sLLPpi77JQHgmUrteKPBRjm6BBkqNVpikYhwemgzOwNj0DdPN84i2Td2jgQ==',
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY || 'ya4a2do186P6EFLL//RZg3Uv4I6hc6uSjiSV0tdPPzwNG/tkHB6LGzsjIdioRy3MdM3/NXRL1CsfdIY21VNc6L0zGKZxRD3THlOYdBVZzo1DWsCbQY9laM6mnk2z2YnRpA9M6uIhdJRsx7ZWmws6ozrzsYezWSG1jWvaWa+OnwdK96Jfdx5wZUq26y9GB4hRJtvih/VnzP4dQIseUCyqn+/Rs1T9oiSsOAmOXcUdnciVEoKCTl4CoprAGQo0eOxzUJINXMfjHZEoYPii0pTXb1woShAebCJYX/xbYHftIgVBxYddqza0oSLWirCDALMEDs2ySwNmfdNBu2hVeDAqiQ==',

  // Database connection
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_PORT: Number(process.env.DATABASE_PORT) || 5433,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'postgres',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '123456',
  DATABASE_NAME: process.env.DATABASE_NAME || 'dev-social-db',
  DATABASE_SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE || false,

  // Google Oauth API
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '716210926361-175bh84udemm9h6gptt8ikcq685nr3o5.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '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',
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/redirect',
});
