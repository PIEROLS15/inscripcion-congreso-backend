import app from './app'
import { env } from '../config/env'

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`🚀 Server corriendo en http://0.0.0.0:${env.PORT}`)
})
