import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const checkToken: (req: Request, res: Response, next: NextFunction) => void = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  const token = req.get('Authorization')?.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`)

    if (!decoded) return res.status(401).json({ message: 'Unauthorized - Invalid Token' })

    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid Token' })
  }
}
