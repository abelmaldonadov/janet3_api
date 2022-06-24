const jwt = require("jsonwebtoken")

const authentication = async (req, res, next) => {
  try {
    const token = await req.headers.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    next()
  } catch (err) {
    res.sendStatus(401)
  }
}

module.exports = authentication
