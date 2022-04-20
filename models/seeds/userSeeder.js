const userModel = require('../userModel')
const userList = require('./user.json')

const mongoose = require('mongoose')

const user_list = userList.users

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  user_list.forEach(user => {
    userModel.create({
      firstName: user.firstName,
      email: user.email,
      password: user.password
    })
  })

  console.log('done')
})