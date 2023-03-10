const express = require('express')
const routesUsers = require('./users.routes')
const routesAuth = require('./auth.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')


function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', routesAuth)
  router.use('/users', routesUsers)
}

module.exports = routerModels
