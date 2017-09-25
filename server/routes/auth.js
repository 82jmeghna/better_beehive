var Router = require('express-promise-router')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

const db = require('../db')

const router = new Router()

module.exports = router

router.post('/saveuser', async (req, res) => {
  const password = bcrypt.hashSync(req.body.login.password, 10)

  const {
    rows,
  } = await db.query(
    'INSERT INTO login(email, username, password) VALUES($1, $2, $3)',
    [
      req.body.login.email,
      req.body.login.username,
      password,
    ]
  )
  res.send(rows[0])
})

router.post('/authenticate', async (req, res) => {
  if (!req.body.token || !req.body.token.email) {
    return res.status(401).send({ message: 'email property is required' })
  }

  if (!req.body.token || !req.body.token.password) {
    return res.status(401).send({ message: 'password property is required' })
  }
  const data = {
    email: req.body.token.email,
  }

  const {
    rows,
  } = await db.query('SELECT * FROM login WHERE email = $1',[data.email])

  if (!rows[0]) {
    return res.status(409).send({ mesage: 'email or password does not match' })
  }

  let a = bcrypt.compareSync(req.body.token.password, rows[0].password)

  if (a === true) {
    const token = jwt.sign(req.body.token, process.env.jwt_secret, {
      expiresIn: 1440 ,// expires in one hour
    })
    return res.send({ error: false, Token: token ,User: rows[0] })

  } else {
    res.send({ 'message': 'password does not match' })
  }
})
