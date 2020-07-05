const bcrypt = require('bcrypt')
const UserSchema = require('../utils/schemas/users')

const createUser = async ({ user }) => {
  const { username, password } = user

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await UserSchema.find({ username })

  const newUser = {
    username,
    password: hashedPassword
  }

  return new Promise((resolve, reject) => {
    if (existingUser.length > 0) {
      resolve({
        error: 'User already exists',
        createdUserId: null
      })
    }

    const myUser = new UserSchema(newUser)
    myUser.save((error, createdUser) => {
      if (error) {
        reject(error)
      }

      resolve({
        error: null,
        createdUserId: createdUser.id
      })
    })
  })
}

const signInUser = async ({ user }) => {
  const { username, password } = user

  const noExistingUser = await UserSchema.find({ username })
}

module.exports = {
  createUser,
  signInUser
}
