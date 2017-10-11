import * as _debug from 'debug'
import * as App from 'koa'
import * as compress from 'koa-compress'
import * as logger from 'koa-logger'

import router from './router'

const debug = _debug('rubick:server')

const app = new App()

app.use(compress()).use(logger())

router(app)

app.listen(3000, () => debug('Server is now running at %s:%s.', 'localhost', 3000))
