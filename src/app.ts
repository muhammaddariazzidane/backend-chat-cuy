import express, { type Request, type Response } from 'express'
import 'dotenv/config'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger'
import { checkToken } from './middleware/checkToken.middleware'
import './utils/connection'
import { userModel } from './models/user.model'
import auth from './routes/auth.route'
import chat from './routes/chat.route'

const app = express()
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'x-access-token'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
  }),
)
app.use(express.json())

app.use('/auth', auth)

app.use('/chat', checkToken, chat)

app.get('/profile', checkToken, (req: Request | any, res: Response) => {
  const user = req.user
  return res.status(200).json({ user })
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', async (_, res) => {
  return res.status(200).json({ message: 'This is Chat Cuy API' })
})

app.get('/users', async (_, res) => {
  const users = await userModel.find({}, 'name email profilePicture')
  return res.status(200).json({ users })
})

app.get('/user/:id', async (req, res) => {
  const { id } = req.params
  const user = await userModel.findById({
    _id: id,
  })
  return res.status(200).json({ id, user })
})

export default app
