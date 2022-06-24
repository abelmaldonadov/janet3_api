const express = require("express")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const db = require("../utils/db")
const meta = require("../utils/meta")
const router = express.Router()

router.use(authorization)
router.use(authentication)

router.route("/:model/:field/:type/:value").get(async (req, res) => {
  // :entity  => Nombre del modelo a encontrar
  // :field   => Campo a buscar
  // :type    => Tipo de busqueda [equals, like]
  // :value   => coincidecia total o parcial dependiendo del :type
  try {
    const { model, field, type, value } = req.params
    const data = {
      data: [],
      meta: await meta(),
    }
    const table = data.meta.models.find((item) => item.id === Number(model)).table
    if (type === "like") {
      data.data = await db(`SELECT * FROM ${table} WHERE ${field} like ?`, ["%" + value + "%"])
    } else if (type === "equals") {
      data.data = await db(`SELECT * FROM ${table} WHERE ${field} = ?`, [value])
    } else {
      throw new Error()
    }
    res.json(data)
  } catch (err) {
    res.sendStatus(404)
  }
})

module.exports = router
