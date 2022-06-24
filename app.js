const entities = require("./src/routes/entities")
const products = require("./src/routes/products")
const transactions = require("./src/routes/transactions")
const users = require("./src/routes/users")
const _find = require("./src/routes/_find")
const signIn = require("./src/routes/signin")

const express = require("express")
// const helmet = require("helmet")
// const morgan = require("morgan")
const app = express()
const port = 3000
const api = "/api"

// Environment Variables
const dotenv = require("dotenv")
dotenv.config({ path: "./.env" })

// Global Middlewares
// app.use(helmet())
// app.use(morgan("tiny"))
app.use(express.json())
app.use(express.static("public"))

// Routes
app.use(`${api}/entities`, entities)
app.use(`${api}/products`, products)
app.use(`${api}/transactions`, transactions)
app.use(`${api}/users`, users)
app.use(`${api}/find`, _find)
app.use(`${api}/signin`, signIn)

// Not Handle Request
app.use((req, res, next) => res.sendStatus(404))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
