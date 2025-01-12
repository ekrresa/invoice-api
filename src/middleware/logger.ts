import { pinoLogger } from 'hono-pino'
import { pino } from 'pino'
import pretty from 'pino-pretty'

import env from 'env.js'

export const logger = pino(
  {
    level: env.LOG_LEVEL || 'info',
  },
  env.NODE_ENV === 'production' ? undefined : pretty({ colorize: true }),
)

export default function requestLogger() {
  return pinoLogger({
    pino: logger,
  })
}
