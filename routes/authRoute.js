const {login} = require('../controllers/authController')
const express = require('express')

const authRoute = express.Router()

authRoute.post('/login', login)

module.exports = {
  authRoute
}