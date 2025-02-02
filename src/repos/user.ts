import * as t from 'drizzle-orm'
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

import db from '@/db/index.js'
import { users } from '@/db/schema.js'
import { CreateUserSchema, UpdateUserSchema, type UpdateUserInput } from '@/db/types.js'
import type { AppBindings } from '@/lib/types.js'

type NewUser = typeof users.$inferInsert

export default class UserRepo {
  private readonly ctx: Context<AppBindings>

  constructor(ctx: Context<AppBindings>) {
    this.ctx = ctx
  }

  async update(id: string, user: UpdateUserInput) {
    const parsedUser = await UpdateUserSchema.parseAsync(user)

    const result = await db.update(users).set(parsedUser).where(t.eq(users.id, id))

    return result.rowsAffected > 0
  }

  async getUserByEmail(email: string) {
    const [result] = await db.select().from(users).where(t.eq(users.email, email))

    return result
  }

  async save(user: NewUser) {
    await CreateUserSchema.parseAsync(user)

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
