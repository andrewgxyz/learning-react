const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 80,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  mongoUri: 'mongodb://' + (process.env.DB_HOST || 'localhost') + ':' + (process.env.DB_PORT || '27017') + '/' + process.env.DB_DATABASE + '?authSource=admin'
}

export default config
