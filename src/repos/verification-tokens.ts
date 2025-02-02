import * as t from 'drizzle-orm'

import db from '@/db/index.js'
import { verificationTokens } from '@/db/schema.js'
import { CreateVerificationTokenSchema, type CreateVerificationToken } from '@/db/types.js'
import type { VerifyEmailInput } from '@/routes/auth/types.js'

export default class VerificationTokensRepo {
  async deleteToken(payload: VerifyEmailInput) {
    const { email, token } = payload

    const result = await db
      .delete(verificationTokens)
      .where(
        t.and(t.eq(verificationTokens.email, email), t.eq(verificationTokens.token, token)),
      )

    return result.rowsAffected > 0
  }

  async getToken(payload: VerifyEmailInput) {
    const { email, token } = payload

    const [result] = await db
      .select()
      .from(verificationTokens)
      .where(
        t.and(t.eq(verificationTokens.email, email), t.eq(verificationTokens.token, token)),
      )

    return result
  }

  async save(input: CreateVerificationToken) {
    await CreateVerificationTokenSchema.parseAsync(input)

    return db.insert(verificationTokens).values(input)
  }
}
