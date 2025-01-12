import { createRouter } from '@/lib/app.js'
import { registerUserHandler } from './handlers.js'
import { registerRoute } from './routes.js'

const authRouter = createRouter().openapi(registerRoute, registerUserHandler)

export default authRouter
