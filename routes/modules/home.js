const express = require('express')
const router = express.Router()

const users = require('../../users')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const { email, password } = req.body
  const data = users.find(item => {
    return item.email === email && item.password === password
  })
  if (data) {
    res.render('welcome', { firstName: data.firstName })
  } else {
    res.render('index', { isError: true, email })
  }
})

module.exports = router
