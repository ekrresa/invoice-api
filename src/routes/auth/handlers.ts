import { addHours } from 'date-fns'
import { HTTPException } from 'hono/http-exception'

import type { AppRouteHandler } from '@/lib/types.js'
import UserRepo from '@/repos/user.js'
import VerificationTokensRepo from '@/repos/verification-tokens.js'
import type { RegisterRoute } from './routes.js'
import { generateRandomNumber, hashPassword } from './utils.js'

export const registerUserHandler: AppRouteHandler<RegisterRoute> = async c => {
  const userRepo = new UserRepo(c)
  const verificationTokensRepo = new VerificationTokensRepo(c)

  const user = c.req.valid('json')

  const userExists = await userRepo.exists(user.email)

  if (userExists) {
    throw new HTTPException(400, { message: 'User already exists' })
  }

  const hashedPassword = await hashPassword(user.password)

  const savedUser = await userRepo.save({
    ...user,
    password: hashedPassword,
  })

  const verificationToken = generateRandomNumber()

  const HOURS_UNTIL_TOKEN_EXPIRES = 12

  await verificationTokensRepo.save({
    userId: savedUser.id,
    token: verificationToken,
    expiresAt: addHours(new Date(), HOURS_UNTIL_TOKEN_EXPIRES).toISOString(),
  })

  //TODO: Send verification email

  return c.json(
    {
      message: 'User created successfully',
    },
    200,
  )
}
