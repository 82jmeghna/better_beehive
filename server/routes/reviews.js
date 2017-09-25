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
    'INSERT INTO reviews(place_id, address, buzz, email, reason, relationship, created_at, updated_at, id) VALUES($1, $2, $3, $4, $5, $6, now(), now(), $7)',
    [
      req.body.review.placeId,
      req.body.review.address,
      req.body.review.buzz,
      req.body.review.email,
      req.body.review.reason,
      req.body.review.relationship,
      req.body.review.id,
    ]
  )
  res.send(rows[0])
})
