import { type UserType } from '../types/user.type'
import { prisma } from '../utils/prisma'
import { hash } from 'bcrypt'

export const createUser = async (payload: UserType) => {
  const hashedPassword = await hash(payload.password, 10)

  return await prisma.user.create({
    data: {
      email: payload.email,
      name: payload.name,
      password: hashedPassword,
      profilePicture: payload.profilePicture ? payload.profilePicture : 'https://figma.com',
    },
  })
}

export const findUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}
