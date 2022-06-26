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
        data: await db(`SELECT * FROM my_entities`),
        meta: await meta(),
      }
      res.json(data)
    } catch (err) {
      res.sendStatus(404)
    }
  })
  .post(async (req, res) => {
    try {
      const { name, ruc, email, phone, address, role, state } = req.body
      await db(
        `INSERT INTO my_entities (name, ruc, email, phone, address, role, state) VALUES (?,?,?,?,?,?,?)`,
        [name, ruc, email, phone, address, role, state]
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
        data: await db(`SELECT * FROM my_entities WHERE id = ?`, [id]),
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
      await db(`DELETE FROM my_entities WHERE id = ?`, [id])
      res.sendStatus(204)
    } catch (err) {
      res.sendStatus(400)
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params
      const { name, ruc, email, phone, address, role, state } = req.body
      await db(
        `UPDATE my_entities SET name = ?, ruc = ?, email = ?, phone = ?, address = ?, role = ?, state = ? WHERE id = ?`,
        [name, ruc, email, phone, address, role, state, id]
      )
      res.sendStatus(201)
    } catch (err) {
      res.sendStatus(400)
    }
  })

module.exports = router
