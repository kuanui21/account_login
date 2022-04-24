const User = require('../User')
const userList = require('./user.json')

const mongoose = require('mongoose')

const users = userList.users

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  users.forEach(user => {
    User.create({
      firstName: user.firstName,
      email: user.email,
      password: user.password
    })
  })

  console.log('done')
})
