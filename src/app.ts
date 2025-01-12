import { apiReference } from '@scalar/hono-api-reference'
import { requestId } from 'hono/request-id'

import { createRouter } from './lib/app.js'
import { errorHandler } from './lib/error.js'
import serveEmojiFavicon from './middleware/favicon.js'
import requestLogger from './middleware/logger.js'
import authRouter from './routes/auth/index.js'

const app = createRouter()

app.use(requestId())
app.use(serveEmojiFavicon('🤑'))

app.use(requestLogger())

app.notFound(c => {
  return c.json({ message: `${c.req.path} - Route not found` }, 404)
})

app.onError(errorHandler)

app.doc('/docs', {
  openapi: '3.0.0',
  info: {
    title: 'Invoice API',
    version: '1.0.0',
    description: 'API for invoice management',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
})

app.get(
  '/',
  apiReference({
    theme: 'purple',
    layout: 'classic',
    defaultHttpClient: {
      targetKey: 'javascript',
      clientKey: 'fetch',
    },
    spec: {
      url: '/docs',
    },
    showSidebar: true,
  }),
)

app.route('/auth', authRouter)

export default app
