import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { CustomJWTHeader } from '../types';


const API_KEY = config.gds.API_KEY || 'dev';
const SECRET_KEY = config.jwt.SECRET || 'SECRET_KEY';

export const generateLimoToken = ( payload: object = {}): string => {

  const header: CustomJWTHeader = {
    alg: 'HS256',
    typ: 'JWT',
    apiKey: API_KEY,
    time: Math.floor(Date.now() / 1000)
  };

  return jwt.sign(
    { ...payload },
    SECRET_KEY,
    { header: header, expiresIn: '1m' }
  );
};

module.exports = {
  generateLimoToken
};