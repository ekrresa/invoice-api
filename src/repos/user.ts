import * as t from 'drizzle-orm'
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

import db from '@/db/index.js'
import { users } from '@/db/schema.js'
import type { AppBindings } from '@/lib/types.js'

type NewUser = typeof users.$inferInsert

export default class UserRepo {
  private readonly ctx: Context<AppBindings>

  constructor(ctx: Context<AppBindings>) {
    this.ctx = ctx
  }

  async exists(email: string) {
    return (await db.$count(users, t.eq(users.email, email))) > 0
  }

  async save(user: NewUser) {
    const [result] = await db.insert(users).values(user).returning()

    if (!result) {
      this.ctx.var.logger.error(
        { requestId: this.ctx.var.requestId, user },
        'Failed to create user',
      )

      throw new HTTPException(500, { message: 'Failed to create user' })
    }

    return result
  }
}
