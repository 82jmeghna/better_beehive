const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

router.get('/', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM reviews')
  res.send(rows)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('SELECT * FROM reviews WHERE place_id = $1', [
    id,
  ])
  res.send(rows)
})

router.post('/', async (req, res) => {
  const {
    rows,
  } = await db.query(
    'INSERT INTO reviews(place_id, buzz, email, reason, relationship, created_at, updated_at) VALUES($1, $2, $3, $4, $5, now(), now())',
    [
      req.body.placeId,
      req.body.buzz,
      req.body.email,
      req.body.reason,
      req.body.relationship,
    ]
  )
  res.send(rows[0])
})
