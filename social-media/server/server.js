import mongoose from "mongoose";
import http from 'http'
import config from "./../config/config"
import app from "./express"

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database ${config.mongoUri}`)
})

http.createServer(app).listen(config.port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s', config.port)
})
