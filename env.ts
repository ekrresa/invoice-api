import dotenv from '@dotenvx/dotenvx'
import { z } from 'zod'

dotenv.config()

const EnvSchema = z
  .object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().default(5432),
    LOG_LEVEL: z
      .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
      .default('info'),
    DATABASE_URL: z
      .string({ required_error: 'DATABASE_URL is required' })
      .url({ message: 'Invalid DATABASE_URL' }),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  })
  .refine(
    env => {
      if (env.NODE_ENV === 'production' && !env.DATABASE_AUTH_TOKEN) {
        return false
      }

      return true
    },
    {
      message: 'DATABASE_AUTH_TOKEN is required in production',
      path: ['DATABASE_AUTH_TOKEN'],
    },
  )

const result = EnvSchema.safeParse(process.env)

if (!result.success) {
  console.error('❌ Invalid env:')
  console.error(JSON.stringify(result.error.flatten().fieldErrors, null, 2))
  process.exit(1)
}

const env = result.data

export default env
