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
  .post((req, res) => {
    res.sendStatus(201)
  })

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const data = {
        data: {
          head: await db("SELECT * FROM my_transactions WHERE id = ?", [req.params.id]),
          body: await db("SELECT * FROM my_transactions_detail WHERE transaction = ?", [
            req.params.id,
          ]),
        },
        meta: await meta(),
      }
      res.json(data)
    } catch (err) {
      res.sendStatus(404)
    }
  })
  .delete((req, res) => {
    res.sendStatus(204)
  })
  .put((req, res) => {
    res.sendStatus(201)
  })

module.exports = router
