import { NextFunction, Request, Response } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization?.replace(/^Bearer\s+/, '');

  if (token) {
    if (req.url === '/login') {
      return res.json({ message: 'Anda sudah login' });
    } else if (req.url === '/register') {
      return res.json({ message: 'Silahkan logout terlebih dahulu' });
    }
  }
  next();
};
