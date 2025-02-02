import crypto from 'node:crypto'
import { hash, verify } from '@node-rs/argon2'

export async function hashPassword(password: string) {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })
}

export async function verifyPasswordHash(hash: string, password: string) {
  return await verify(hash, password)
}

export function generateRandomNumber(maxLength = 6) {
  let result = ''

  for (let i = 0; i < maxLength; i++) {
    const randomNumber = crypto.randomInt(10)
    result = result.concat(randomNumber.toString())
  }

  return result
}
