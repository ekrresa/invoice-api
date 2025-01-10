import { apiReference } from '@scalar/hono-api-reference'
import type { AppOpenAPI } from './types.js'
import packageJson from '~/package.json' with { type: 'json' }

export default function configureApiDocs(app: AppOpenAPI) {
  app.doc('/docs', {
    openapi: '3.0.0',
    info: {
      title: 'Invoice API',
      version: packageJson.version,
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
      showSidebar: true
    }),
  )
}
