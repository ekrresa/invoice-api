import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import type { PinoLogger } from 'hono-pino'
import type { RequestIdVariables } from 'hono/request-id'

export interface AppBindings {
  Variables: {
    logger: PinoLogger
  } & RequestIdVariables
}

export interface AppError {
  message: string
  stack?: string
  errors?: Record<string, string | string[]>
}

export type AppOpenAPI = OpenAPIHono<AppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>
