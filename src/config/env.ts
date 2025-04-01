import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  GDS_API_URL: process.env.GDS_API_URL || 'https://api.waynium.com/gdsv3',
  GDS_API_KEY: process.env.GDS_API_KEY || 'dev',
  GDS_API_SECRET: process.env.GDS_API_SECRET || 'your_api_secret',
  GDS_LIMO: process.env.GDS_LIMO || 'dev',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1m',
  AZURE_WEBAPP_NAME: process.env.AZURE_WEBAPP_NAME || 'gds-limo-api'
};

export default env;