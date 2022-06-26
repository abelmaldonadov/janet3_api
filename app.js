const entities = require("./src/routes/entities")
const products = require("./src/routes/products")
const transactions = require("./src/routes/transactions")
const users = require("./src/routes/users")
const signIn = require("./src/routes/signin")
const media = require("./src/routes/media")

const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const authorization = require("./src/middlewares/authorization")
const app = express()
const port = 8080
const api = "/api"

// Environment Variables
const dotenv = require("dotenv")
dotenv.config({ path: "./.env" })

// Global Middlewares
app.use(helmet())
app.use(morgan("tiny"))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(authorization)

// Routes
app.use(`${api}/entities`, entities)
app.use(`${api}/products`, products)
app.use(`${api}/transactions`, transactions)
app.use(`${api}/users`, users)
app.use(`${api}/signin`, signIn)
app.use(`${api}/media`, media)

// Not Handle Request
app.use((req, res, next) => res.sendStatus(404))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
