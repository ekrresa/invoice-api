import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import type { LambdaEvent, LambdaContext } from 'hono/aws-lambda'

type Bindings = {
  event: LambdaEvent
  lambdaContext: LambdaContext
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', c => {
  return c.text('Hello Hono!')
})

export const handler = handle(app)
