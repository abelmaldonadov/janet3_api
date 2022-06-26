const express = require("express")
const authentication = require("../middlewares/authentication")
const db = require("../utils/db")
const meta = require("../utils/meta")
const router = express.Router()

router.use(authentication)

router
  .route("/")
  .get(async (req, res) => {
    try {
      const data = {
        data: await db(`SELECT * FROM conf_users`),
        meta: await meta(),
      }
      res.json(data)
    } catch (err) {
      res.sendStatus(404)
    }
  })
  .post(async (req, res) => {
    try {
      const { username, password, entity, level, state } = req.body
      await db(
        `INSERT INTO conf_users (username, password, entity, level, state) VALUES (?,?,?,?,?)`,
        [username, password, entity, level, state]
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
        data: await db(`SELECT * FROM conf_users WHERE id = ?`, [id]),
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
      await db(`DELETE FROM conf_users WHERE id = ?`, [id])
      res.sendStatus(204)
    } catch (err) {
      res.sendStatus(400)
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params
      const { username, password, entity, level, state } = req.body
      await db(
        `UPDATE conf_users SET username = ?, password = ?, entity = ?, level = ?, state = ? WHERE id = ?`,
        [username, password, entity, level, state, id]
      )
      res.sendStatus(201)
    } catch (err) {
      res.sendStatus(400)
    }
  })

module.exports = router
