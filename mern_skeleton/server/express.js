import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import config from '../config/config'
import Template from './../template'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  return res.status(200).send(Template())
})

http.createServer(app).listen(config.port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s', config.port)
})
