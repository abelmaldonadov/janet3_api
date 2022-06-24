const authorization = (req, res, next) => {
  // Permisos
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, token, user"
  )

  // Solicitud enviada para autorizar la request
  if (req.method === "OPTIONS") {
    res.sendStatus(200)
  } else {
    next()
  }
  // res.sendStatus(403)
}

module.exports = authorization
