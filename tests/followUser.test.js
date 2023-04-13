const request = require('supertest')
const express = require('express')
const { userRoute } = require("../routes/userRoute")

const app = express()

app.use(express.json())
app.use('/users', userRoute)


describe('Testing users/follow endpoint', () => {
  describe('PATCH /users/follow with invalid payload', () => {

    it('should respond with status 400', async () => {
      const response = await request(app).patch('/users/follow').send({
        password: 'qwerty',
      })
      expect(response.statusCode).toBe(400)
    })

  })
})
