import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { users, verificationTokens } from './schema.js'

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(128)
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/\d/, 'Password must contain at least one number')

export const CreateUserSchema = createInsertSchema(users, {
  firstName: schema => schema.min(2),
  lastName: schema => schema.min(2),
  email: schema => schema.email(),
  password: passwordSchema,
}).pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
})

export const UpdateUserSchema = createInsertSchema(users, {
  firstName: schema => schema.min(2),
  lastName: schema => schema.min(2),
  email: schema => schema.email(),
  password: passwordSchema,
  emailVerifiedAt: z.string().datetime(),
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial()

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
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
