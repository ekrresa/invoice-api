import type { Context, ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { ZodError } from 'zod'

import env from 'env.js'
import type { AppBindings } from './types.js'

export const errorHandler: ErrorHandler = (error, c: Context<AppBindings>) => {
  let errors = undefined
  let errorMessage = error.message
  let statusCode: ContentfulStatusCode = 500

  if (error instanceof ZodError) {
    errorMessage = 'Bad request'
    errors = error.flatten().fieldErrors
    statusCode = 400
  }

  if (error instanceof HTTPException) {
    statusCode = error.status
  }

  if (statusCode >= 500) {
    c.var.logger.error({ requestId: c.var.requestId, error }, 'Internal server error')
  }

  return c.json(
    {
      message: errorMessage,
      errors,
      stack: env.NODE_ENV === 'production' ? undefined : error.stack,
    },
    statusCode,
  )
}
