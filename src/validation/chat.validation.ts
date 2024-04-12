import { type Chat } from '../types/chat.type'
import { z } from 'zod'

export const createChatValidation = async (payload: Chat) => {
  return await z
    .object({
      message: z.string(),
    })
    .required()
    .safeParseAsync(payload)
}

export const updateChatValidation = async (payload: Chat) => {
  return await z
    .object({
      message: z.string(),
    })
    .required()
    .safeParseAsync(payload)
}
