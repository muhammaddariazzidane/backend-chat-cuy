import { Router } from 'express'
import { deleteMessage, getMessage, sendMessage, updateMessage } from '../controllers/chat.controller'
import { checkToken } from '../middleware/checkToken.middleware'

export const ChatRouter: Router = Router()

ChatRouter.use(checkToken)

ChatRouter.post('/:id/send', async (req, res) => await sendMessage(req as any, res))
ChatRouter.get('/:id/message', async (req, res) => await getMessage(req as any, res))
ChatRouter.put('/:id/update', async (req, res) => await updateMessage(req as any, res))
ChatRouter.delete('/:id/delete', async (req, res) => await deleteMessage(req as any, res))
