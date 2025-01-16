import { createInsertSchema } from 'drizzle-zod'
import type { z } from 'zod'

import { users, verificationTokens } from './schema.js'

export const CreateUserSchema = createInsertSchema(users, {
  firstName: schema => schema.min(2),
  lastName: schema => schema.min(2),
  email: schema => schema.email(),
  password: schema =>
    schema
      .min(8, 'Password must be at least 8 characters long')
      .max(128)
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number'),
}).pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
})

export const CreateVerificationTokenSchema = createInsertSchema(verificationTokens, {
  email: schema => schema.email(),
  token: schema => schema.min(6),
  expiresAt: schema => schema.date(),
}).pick({
  email: true,
  expiresAt: true,
  token: true,
})

export type CreateVerificationToken = z.infer<typeof CreateVerificationTokenSchema>
