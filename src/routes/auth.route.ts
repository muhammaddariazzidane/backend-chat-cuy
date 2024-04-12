import { Router } from 'express'
import { Login, Register } from '../controllers/auth.controller'
import { checkAuth } from '../middleware/auth.middleware'

export const AuthRouter: Router = Router()

AuthRouter.use(checkAuth)

AuthRouter.post('/register', Register)
AuthRouter.post('/login', Login)
