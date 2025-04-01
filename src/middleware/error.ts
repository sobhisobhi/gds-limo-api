// src/middleware/error.ts
import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';

export const errorHandler = (
  err: Error | AxiosError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  
  if ('isAxiosError' in err && err.isAxiosError) {
    return res.status(err.response?.status || 500).json({
      error:  'GDS API request failed'
    });
  }
  
  res.status(500).json({ error: err.message || 'Something went wrong' });
};