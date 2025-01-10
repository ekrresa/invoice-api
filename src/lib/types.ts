import type { OpenAPIHono } from '@hono/zod-openapi'
import type { PinoLogger } from 'hono-pino'

export interface AppBindings {
  Variables: {
    logger: PinoLogger
  }
}

export interface AppError {
  message: string
  stack?: string
  errors?: Record<string, string | string[]>
}

export type AppOpenAPI = OpenAPIHono<AppBindings>
