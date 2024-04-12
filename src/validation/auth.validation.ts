import { type UserType } from '../types/user.type'
import { z } from 'zod'

export const createUserValidation = async (payload: UserType) => {
  return await z
    .object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      profilePicture: z.string().default('https://figma.com'),
    })
    .required()
    .safeParseAsync(payload)
}

export const userLoginValidation = async (payload: UserType) => {
  return await z
    .object({
      email: z.string(),
      password: z.string(),
    })
    .required()
    .safeParseAsync(payload)
}
