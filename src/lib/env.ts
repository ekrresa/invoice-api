import { createEnv } from '@t3-oss/env-core'
import { z, ZodError } from 'zod'
import dotenv from '@dotenvx/dotenvx'

dotenv.config()

export const env = createEnv({
  server: {
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().default(5432),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
    // DATABASE_URL: z.string().url(),
    // DATABASE_AUTH_TOKEN: z.string().optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  onValidationError: (error: ZodError) => {
    console.error('❌ Invalid environment variables:', error.flatten().fieldErrors)
    throw new Error('Invalid environment variables')
  },
})
