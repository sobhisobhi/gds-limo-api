import env from './env';

export const config = {
  PORT: env.PORT,
  NODE_ENV: env.NODE_ENV,
  gds: {
    API_URL: env.GDS_API_URL,
    API_KEY: env.GDS_API_KEY,
    LIMO: env.GDS_LIMO
  },
  jwt: {
    SECRET: env.JWT_SECRET,
    EXPIRES_IN: env.JWT_EXPIRES_IN
  },
  azure: {
    WEBAPP_NAME: env.AZURE_WEBAPP_NAME
  }
};