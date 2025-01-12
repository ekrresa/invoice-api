import { sql } from 'drizzle-orm'
import * as t from 'drizzle-orm/sqlite-core'
import { ulid } from 'ulidx'

const timestamps = {
  createdAt: t.text('created_at').$defaultFn(() => sql`(CURRENT_TIMESTAMP)`),
  updatedAt: t
    .text('updated_at')
    .$defaultFn(() => sql`(CURRENT_TIMESTAMP)`)
    .$onUpdateFn(() => sql`(CURRENT_TIMESTAMP)`),
}

export const users = t.sqliteTable('users', {
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => ulid()),
  firstName: t.text('first_name').notNull(),
  lastName: t.text('last_name').notNull(),
  email: t.text().unique().notNull(),
  password: t.text().notNull(),
  emailVerifiedAt: t
    .text('email_verified_at')
    .$type<string | null>()
    .$defaultFn(() => null),
  status: t
    .text({ enum: ['active', 'inactive', 'suspended'] })
    .notNull()
    .default('inactive'),
  ...timestamps,
})

export const apiKeys = t.sqliteTable('api_keys', {
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => ulid()),
  apiKey: t.text('api_key').notNull().unique(),
  userId: t
    .text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .unique(),
  isActive: t
    .text({ enum: ['active', 'inactive'] })
    .notNull()
    .default('active'),
  ...timestamps,
  expiresAt: t.text('expires_at').notNull(),
})

export const verificationTokens = t.sqliteTable('verification_tokens', {
  id: t.integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  token: t.text('token').notNull().unique(),
  userId: t
    .text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  expiresAt: t.text('expires_at').notNull(),
  createdAt: timestamps.createdAt,
})
