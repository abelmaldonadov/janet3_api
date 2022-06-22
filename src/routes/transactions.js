const express = require("express")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const db = require("../utils/db")
const meta = require("../utils/meta")
const router = express.Router()

router.use(authentication)
router.use(authorization)

router
  .route("/")
  .get(async (req, res) => {
    try {
      const data = {
        data: await db("SELECT * FROM my_transactions"),
        meta: await meta(),
      }
      res.json(data)
    } catch (err) {
      res.sendStatus(404)
    }
  })
  .post(async (req, res) => {
    try {
      const { total, coin, transactionType, tracking, entity, state } = req.body
      await db(
        `INSERT INTO my_transactions (total, coin, transactionType, tracking, entity, state) VALUES (?,?,?,?,?,?)`,
        [total, coin, transactionType, tracking, entity, state]
      )
      res.sendStatus(201)
    } catch (err) {
      res.sendStatus(400)
    }
  })

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params
      const data = {
        data: {
          head: await db("SELECT * FROM my_transactions WHERE id = ?", [id]),
          body: await db("SELECT * FROM my_transactions_detail WHERE transaction = ?", [id]),
        },
        meta: await meta(),
      }
      res.json(data)
    } catch (err) {
      res.sendStatus(404)
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params
      await db(`DELETE FROM my_transactions WHERE id = ?`, [id])
      res.sendStatus(204)
    } catch (err) {
      res.sendStatus(400)
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params
      const { total, coin, transactionType, tracking, entity, state } = req.body
      await db(
        `UPDATE my_transactions SET total = ?, coin = ?, transactionType = ?, tracking = ?, entity = ?, state = ? WHERE id = ?`,
        [total, coin, transactionType, tracking, entity, state, id]
      )
      res.sendStatus(201)
    } catch (err) {
      res.sendStatus(400)
    }
  })

module.exports = router
