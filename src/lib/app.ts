import { OpenAPIHono } from '@hono/zod-openapi'

import type { AppBindings } from './types.js'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          {
            message: 'Bad request',
            errors: result.error.flatten().fieldErrors,
          },
          400,
        )
      }
    },
  })
}

// export default function createApp() {
//   const app = createRouter()

//   app.use(serveEmojiFavicon('🤑'))
//   app.use(requestLogger())

//   app.notFound(c => {
//     return c.json({ message: `${c.req.path} - Route not found` }, 404)
//   })

//   app.onError(errorHandler)

//   return app
// }
