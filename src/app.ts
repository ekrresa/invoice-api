import configureApiDocs from './lib/api-docs.js'
import createApp from './lib/app.js'
import homeRouter from './routes/index.js'

const app = createApp()

configureApiDocs(app)

app.route('/', homeRouter)

export default app
