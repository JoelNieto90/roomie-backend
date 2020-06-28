const express = require('express')
const usersService = require('../services/users')

const authRoutes = app => {
  const router = express.Router()
  app.use('/api/auth', router)

  // ? Creates a new user
  router.post('/sign-up', async (req, res, next) => {
    const user = req.body

    try {
      const createdUserId = await usersService.createUser({ user })
      res.status(201).json({
        data: createdUserId,
        message: 'User created!'
      })
    } catch (error) {
      next(error)
    }
  })

  // TODO: User Signin
  router.post('/sign-in', (req, res, next) => {

  })
}

module.exports = authRoutes