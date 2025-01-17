import { z } from '@hono/zod-openapi'

export const VerifyEmailSchema = z.object({
  email: z.string().email(),
  token: z.string().length(6),
})

export type VerifyEmailInput = z.infer<typeof VerifyEmailSchema>
