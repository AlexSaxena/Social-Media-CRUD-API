const request = require('supertest')
const express = require('express')
const { authRoute } = require("../routes/authRoute")

const app = express()

app.use(express.json())
app.use('/auth', authRoute)


describe('Testing login endpoints', () => {
  describe('POST /auth/login with invalid payload', () => {

    it('should respond with status 400', async () => {
      const response = await request(app).post('/auth/login').send({
        username: 'hej',
        password: 'password123'
      })
      expect(response.statusCode).toBe(400)
    })

    it('should respond with "Password is required"', async () => {
      const response = await request(app).post('/auth/login').send({
        username: 'Janne',
      })
      expect(response.body.message).toBe('Password is required')
    })
  })
})
