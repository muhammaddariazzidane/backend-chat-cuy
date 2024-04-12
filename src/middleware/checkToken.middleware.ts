import { type Request, type Response, type NextFunction } from 'express'
import { prisma } from '../utils/prisma'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

interface CustomRequest extends Request {
  user?: { id: string; name: string; email: string; createdAt: Date; updatedAt: Date } // Mengganti UserType dengan struktur yang tepat
}
interface DecodedToken {
  id: string
}

export const checkToken: (req: CustomRequest, res: Response, next: NextFunction) => void = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`) as DecodedToken

    if (!decoded) return res.status(401).json({ message: 'Unauthorized - Invalid Token' })

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    })

    if (!user) return res.status(404).json({ message: 'Pennguna tidak ditemukan' })

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid Token' })
  }
}
