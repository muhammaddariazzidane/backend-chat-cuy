import { type Request, type Response } from 'express'
import { handleValidation } from '../helpers/validation.helper'
import { createChatValidation, updateChatValidation } from '../validation/chat.validation'
import { createChat, deleteChatById, findChatsBySenderAndReceiver, updateChatById } from '../services/chat.service'

interface CustomRequest extends Request {
  user: { id: string }
}
export const getMessage = async (req: CustomRequest, res: Response) => {
  const { id: receiverId } = req.params
  const { id: senderId } = req.user

  try {
    if (!receiverId) return res.status(404).json({ message: 'Pesan tidak dtemukan' })

    const chats = await findChatsBySenderAndReceiver(senderId, receiverId)

    return res.json({ message: 'Success mengambil data pesan', chats })
  } catch (error: any) {
    console.error('Internal server error:', error?.meta?.cause)
    return res.status(500).json({ message: error?.meta?.cause })
  }
}

export const sendMessage = async (req: CustomRequest, res: Response) => {
  const { id: senderId } = req.user
  const { id: receiverId } = req.params

  try {
    const validatedChat = await handleValidation(req, res, createChatValidation)

    if (!validatedChat.success) return

    const newChat = {
      senderId,
      receiverId,
      message: validatedChat.data.message,
    }
    await createChat(newChat)

    return res.status(201).json({ message: 'Success Create Message', newChat })
  } catch (error: any) {
    console.error('Internal server error:', error?.meta?.cause)
    return res.status(500).json({ message: error?.meta?.cause })
  }
}

export const updateMessage = async (req: Request, res: Response) => {
  const { id } = req.params
  const { message } = req.body

  try {
    const validatedChat = await handleValidation(req, res, updateChatValidation)

    if (!validatedChat.success) return

    await updateChatById(id, message)

    return res.json({ message: 'berhasil edit pesan' })
  } catch (error: any) {
    console.error('Internal server error:', error?.meta?.cause)
    return res.status(500).json({ message: error })
  }
}

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await deleteChatById(id)
    return res.json({ message: 'Berhasil menghapus pesan' })
  } catch (error: any) {
    console.error('Internal server error:', error?.meta?.cause)
    return res.status(500).json({ message: error?.meta?.cause })
  }
}
