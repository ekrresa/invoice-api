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
    EMAIL_HOST: z.string().optional(),
    EMAIL_PORT: z.coerce.number().default(465),
    EMAIL_USERNAME: z.string().optional(),
    EMAIL_PASSWORD: z.string().optional(),
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
  .refine(
    env => {
      const { EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD } = env

      if (env.NODE_ENV === 'CI' && (!EMAIL_HOST || !EMAIL_USERNAME || !EMAIL_PASSWORD)) {
        return true
      }

      return [EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD].every(Boolean)
    },
    { message: 'Please provide all required env variables' },
  )

const result = EnvSchema.safeParse(process.env)

if (!result.success) {
  console.error('❌ Invalid env:')
  console.error(JSON.stringify(result.error.flatten().fieldErrors, null, 2))
  process.exit(1)
}

const env = result.data

export default env
