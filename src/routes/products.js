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
        data: await db(`SELECT * FROM my_products`),
        meta: await meta(),
      }
      res.json(data)
    } catch (err) {
      res.sendStatus(404)
    }
  })
  .post(async (req, res) => {
    try {
      const { name, serial, brand, description, price, stock, coin, vendor, state } = req.body
      console.log(name, serial, brand, description, price, stock, coin, vendor, state)
      await db(
        `INSERT INTO my_products (name, serial, brand, description, price, stock, coin, vendor, state) VALUES (?,?,?,?,?,?,?,?,?)`,
        [name, serial, brand, description, price, stock, coin, vendor, state]
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
        data: await db(`SELECT * FROM my_products WHERE id = ?`, [id]),
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
      await db(`DELETE FROM my_products WHERE id = ?`, [id])
      res.sendStatus(204)
    } catch (err) {
      res.sendStatus(400)
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params
      const { name, serial, brand, description, price, stock, coin, vendor, state } = req.body
      await db(
        `UPDATE my_products SET 
                name = ?, serial = ?, brand = ?, description = ?, price = ?, stock = ?, coin = ?, vendor = ?, state = ? WHERE id = ?`,
        [name, serial, brand, description, price, stock, coin, vendor, state, id]
      )
      res.sendStatus(201)
    } catch (err) {
      res.sendStatus(400)
    }
  })

module.exports = router
