import { type NextFunction, type Request, type Response } from 'express'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('Authorization')?.split(' ')[1]

  if (token) {
    if (req.url === '/login') {
      return res.json({ message: 'Anda sudah login' })
    } else if (req.url === '/register') {
      return res.json({ message: 'Silahkan logout terlebih dahulu' })
    }
  }
  next()
}
