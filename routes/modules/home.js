const express = require('express')
const router = express.Router()
const session = require('express-session')
const usePassport = require('../../config/passport')

const User = require('../../users')

router.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
  }))

usePassport(router)

router.get('/', (req, res) => {
  if (req.session.login) {
    return res.render('login')
  }
  res.render('index')
})

router.post('/', (req, res) => {
  const { email, password } = req.body
  const data = User.find(item => {
    return item.email === email && item.password === password
  })
  if (data) {
    req.session.login = true
    data.sessionID = req.sessionID
    res.render('welcome', { firstName: data.firstName })
  } else {
    res.render('index', { isError: true, email })
  }
})

// // 登出 GET 路由
router.get('/logout', (req, res) => {
  req.logout()
  // delete req.session
  req.user = null
  res.render('index')
})

module.exports = router
