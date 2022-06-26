const express = require("express")
const authentication = require("../middlewares/authentication")
const router = express.Router()
const multer = require("multer")
const mimeTypes = require("mime-types")

router.use(authentication)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb("", `public/uploads/`)
  },
  filename: function (req, file, cb) {
    cb("", `${Date.now()}.${mimeTypes.extension(file.mimetype)}`)
  },
})

const upload = multer({ storage })

router.post("/", upload.single("file"))

router.use((req, res, next) => {
  res.sendStatus(201)
})

module.exports = router
