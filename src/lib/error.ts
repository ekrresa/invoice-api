import type { ErrorHandler } from 'hono'
import { env } from './env.js'
import { ZodError } from 'zod'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const errorHandler: ErrorHandler = (error, c) => {
  let statusCode: ContentfulStatusCode = 500
  let errors = undefined

  if (error instanceof ZodError) {
    statusCode = 400
    const errorMap = error.flatten()
    errors = errorMap.fieldErrors
  }

  if (error instanceof HttpError) {
    statusCode = error.statusCode
  }

  return c.json(
    {
      message: error.message,
      errors,
      stack: env.NODE_ENV === 'production' ? undefined : error.stack,
    },
    statusCode,
  )
}

export class HttpError extends Error {
  statusCode: ContentfulStatusCode

  constructor(statusCode: ContentfulStatusCode, message: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'HttpError'
    this.message = message
    this.statusCode = statusCode
  }
}
