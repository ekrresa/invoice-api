import { createRouter } from '@/lib/app.js'
import { registerUserHandler, verifyEmailHandler } from './handlers.js'
import { registerRoute, verifyEmailRoute } from './routes.js'

const authRouter = createRouter()
  .openapi(registerRoute, registerUserHandler)
  .openapi(verifyEmailRoute, verifyEmailHandler)

export default authRouter
