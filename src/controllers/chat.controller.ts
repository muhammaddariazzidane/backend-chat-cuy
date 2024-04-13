import { type Request, type Response } from 'express'
import { createChat, deleteChatById, findChatsBySenderAndReceiver, updateChatById } from '../services/chat.service'
import { createChatValidation, updateChatValidation } from '../validation/chat.validation'
import { handleValidation } from '../helpers/validation.helper'

export const getMessage = async (req: Request | any, res: Response) => {
  const { id: receiver } = req.params
  const { id: sender } = req.user

  try {
    const chats = await findChatsBySenderAndReceiver(sender, receiver)

    return res.status(200).json({
      message: 'Success mengambil data pesan',
      chats,
    })
  } catch (error: any) {
    console.error('Internal server error:', error)
    return res.status(500).json({ message: error })
  }
}
export const sendMessage = async (req: Request | any, res: Response) => {
  const { id: sender } = req.user
  const { id: receiver } = req.params

  try {
    const validatedChat = await handleValidation(req, res, createChatValidation)

    if (!validatedChat.success) return

    const newChat = {
      sender,
      receiver,
      message: validatedChat.data.message,
    }
    await createChat(newChat)

    return res.status(201).json({ message: 'Success Create Message', newChat })
  } catch (error: any) {
    console.error('Internal server error:', error)
    return res.status(500).json({ message: error })
  }
}
export const updateMessage = async (req: Request, res: Response) => {
  const { id } = req.params
  const payload = req.body

  try {
    const validatedChat = await handleValidation(req, res, updateChatValidation)

    if (!validatedChat.success) return

    await updateChatById(id, payload)

    return res.status(200).json({ message: 'berhasil edit pesan' })
  } catch (error: any) {
    console.error('Internal server error:', error?.meta?.cause)
    return res.status(500).json({ message: error })
  }
}
export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await deleteChatById(id)
    return res.status(200).json({ message: 'Berhasil menghapus pesan' })
  } catch (error: any) {
    console.error('Internal server error:', error?.meta?.cause)
    return res.status(500).json({ message: error?.meta?.cause })
  }
}
