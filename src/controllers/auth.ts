import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';


const API_KEY = config.gds.API_KEY || 'dev';
console.log('API_KEY: ', API_KEY);
const SECRET_KEY = config.gds.API_SECRET || 'SECRET_KEY';
console.log('SECRET_KEY: ', SECRET_KEY);

export const generateLimoToken = ( payload: object = {}): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
    apiKey: API_KEY,
    time: Math.floor(Date.now() / 1000)
  };

/*   req.headers['time'] = Math.floor(Date.now() / 1000).toString();
  req.headers['apikey'] = config.gds.API_KEY

  const header =
  {
    "alg":req.headers['alg'] as string,
    "typ":req.headers['typ'] as string,
    "apiKey":req.headers['apikey'],
    "time": req.headers['time']
  }; */

  return jwt.sign(
    { ...payload },
    SECRET_KEY,
    { header }
  );
};

module.exports = {
  generateLimoToken
};