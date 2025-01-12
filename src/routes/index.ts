import { createRoute, z } from '@hono/zod-openapi'

import { createRouter } from '@/lib/app.js'

const homeRouter = createRouter().openapi(
  createRoute({
    method: 'get',
    tags: ['Home'],
    path: '/',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z
              .object({ message: z.string() })
              .openapi({ example: { message: 'Welcome to the Invoice API!' } }),
          },
        },
        description: 'Successful response',
      },
    },
  }),
  c => {
    return c.json({ message: 'Welcome to the Invoice API!' }, 200)
  },
)

export default homeRouter
