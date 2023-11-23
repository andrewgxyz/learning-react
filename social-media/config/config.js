const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 80,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  mongoUri: process.env.MONGO_URI
}

console.log(config)

export default config
