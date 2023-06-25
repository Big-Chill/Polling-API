const corsOption = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  exposedHeaders: ['Access-Control-Allow-Credentials'],
}

module.exports = corsOption;