import configureApiDocs from './lib/api-docs.js'
import createApp from './lib/app.js'

const app = createApp()

configureApiDocs(app)

export default app
