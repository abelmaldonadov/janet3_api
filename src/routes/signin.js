const db = require("../utils/db")
const meta = require("../utils/meta")
const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.route("/").post(async (req, res) => {
  try {
    const { username, password } = req.body
    // Validar identidad
    const user = await db(
      `SELECT * FROM conf_users WHERE username = ? AND password = ? AND state = 1`,
      [username, password]
    )
    if (user.length > 0) {
      // Crear token
      const token = jwt.sign(
        {
          data: { user: user[0] },
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "10m" }
      )
      // Insertar la sesión
      await db(`INSERT INTO conf_sessions (host, token, user) VALUES (?,?,?)`, [
        req.headers.origin,
        token,
        user[0].id,
      ])
      // Obtener la última sesión
      const data = {
        data: await db(`SELECT * FROM conf_sessions ORDER BY date DESC LIMIT 1`),
        meta: await meta(),
      }
      res.json(data)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    res.sendStatus(404)
  }
})

module.exports = router
