const mongoose = require("mongoose");
const config = require("./../config/config")

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

mongoose.connection.on('error', () => {
  throw new Error('Unable to connect to database ${mongoUri}')
})
