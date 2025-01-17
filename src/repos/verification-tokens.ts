import type { Context } from 'hono'

import db from '@/db/index.js'
import { verificationTokens } from '@/db/schema.js'
import { CreateVerificationTokenSchema, type CreateVerificationToken } from '@/db/types.js'
import type { AppBindings } from '@/lib/types.js'

export default class VerificationTokensRepo {
  private readonly ctx: Context<AppBindings>

  constructor(ctx: Context<AppBindings>) {
    this.ctx = ctx
  }

  async save(input: CreateVerificationToken) {
    await CreateVerificationTokenSchema.parseAsync(input)

    return db.insert(verificationTokens).values(input)
  }
}
