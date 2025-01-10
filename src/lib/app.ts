import { OpenAPIHono } from '@hono/zod-openapi'
import type { AppBindings } from './types.js'

import { errorHandler } from './error.js'
import { Logger } from '@/middleware/logger.js'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          {
            message: result.error.message,
            errors: result.error.flatten().fieldErrors,
          },
          400,
        )
      }
    },
  })
}

export default function createApp() {
  const app = createRouter()

  app.use(Logger())

  app.notFound(c => {
    return c.json({ message: `${c.req.path} - Route not found` }, 404)
  })

  app.onError(errorHandler)

  return app
}