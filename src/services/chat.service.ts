import { type Chat } from '../types/chat.type'
import { prisma } from '../utils/prisma'

export const createChat = async ({ message, senderId, receiverId }: Chat) => {
  return await prisma.chat.create({
    data: {
      message,
      senderId,
      receiverId,
    },
  })
}

export const updateChatById = async (id: string, message: string) => {
  return await prisma.chat.update({
    where: { id },
    data: { message },
  })
}

export const findChatsBySenderAndReceiver = async (senderId: string, receiverId: string) => {
  return await prisma.chat.findMany({
    where: {
      OR: [
        {
          senderId,
        },
        { receiverId: senderId, senderId: receiverId },
      ],
    },
    include: {
      receiver: {
        select: {
          name: true,
          email: true,
          password: false,
        },
      },
      sender: {
        select: {
          name: true,
          email: true,
          password: false,
        },
      },
    },
  })
}

export const deleteChatById = async (id: string) => {
  return await prisma.chat.delete({
    where: {
      id,
    },
  })
}
