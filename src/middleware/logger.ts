import env from '@/lib/env.js'
import { pinoLogger } from 'hono-pino'
import { pino } from 'pino'
import pretty from 'pino-pretty'

export default function appLogger() {
  return pinoLogger({
    pino: pino(
      {
        level: env.LOG_LEVEL || 'info',
      },
      env.NODE_ENV === 'production' ? undefined : pretty(),
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  })
}
