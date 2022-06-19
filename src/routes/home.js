const express = require("express")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const router = express.Router()

router.use(authentication)
router.use(authorization)

router
  .route("/")
  .get((req, res) => {
    res.send("home")
  })
  .post((req, res) => {
    res.sendStatus(201)
  })

router
  .route("/:id")
  .get((req, res) => {
    res.send("id: " + req.params.id)
  })
  .delete((req, res) => {
    res.sendStatus(204)
  })
  .put((req, res) => {
    res.sendStatus(201)
  })

module.exports = router
