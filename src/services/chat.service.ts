import { type Chat } from '../types/chat.type'
import { chatModel } from '../models/chat.model'

export const createChat = async (payload: Chat) => {
  return await chatModel.create(payload)
}

export const updateChatById = async (id: string, payload: Chat) => {
  return await chatModel.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: payload },
  )
}

export const findChatsBySenderAndReceiver = async (sender: string, receiver: string) => {
  return await chatModel
    .find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    })
    .populate('sender', 'name email')
    .populate('receiver', 'name email')
}
export const deleteChatById = async (id: string) => {
  return await chatModel.findOneAndDelete({
    _id: id,
  })
}
