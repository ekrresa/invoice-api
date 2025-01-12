import { createRoute, z } from '@hono/zod-openapi'

import { CreateUserSchema } from '@/db/types.js'

const tags = ['Auth']

export const registerRoute = createRoute({
  path: '/',
  method: 'post',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserSchema,
        },
      },
      description: 'Create a new user',
      required: true,
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: 'User created successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            errors: z.record(z.string(), z.array(z.string())).optional(),
          }),
        },
      },
      description: 'The validation error(s)',
    },
  },
})

export type RegisterRoute = typeof registerRoute
