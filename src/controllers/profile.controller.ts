import { type Request, type Response } from 'express'

interface CustomRequest extends Request {
  user?: { id: string; name: string; email: string; createdAt: Date; updatedAt: Date } // Mengganti UserType dengan struktur yang tepat
}

export const getProfile = async (req: CustomRequest, res: Response) => {
  const user = req.user
  return res.json({ user })
}
