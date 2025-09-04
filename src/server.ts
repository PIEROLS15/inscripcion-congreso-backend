import app from './app'
import { env } from '../config/env'

app.listen(env.PORT, () => {
  console.log(`🚀 Server corriendo en http://localhost:${env.PORT}`)
})
