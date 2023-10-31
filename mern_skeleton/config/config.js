const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8020,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  mongoUri: process.env.MONGO_URI || 
    process.env.MONGO_HOST || 
    'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mernproject'
}

export default config
