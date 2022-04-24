const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const User = require('./models/User')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const { email, password } = req.body

  User.findOne({ email, password })
    .lean()
    .then(data => {
      if (data) {
        res.render('welcome', { firstName: data.firstName })
      } else {
        res.render('index', { isError: true })
      }
    })
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
