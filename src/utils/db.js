const mysql = require("mysql")

const db = (query, bind) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "janet3",
    })
    connection.connect(function (err) {
      if (err) reject(err)
    })
    connection.query(query, bind, function (error, results, fields) {
      if (error) reject(error)
      results = JSON.parse(JSON.stringify(results))
      resolve(results)
    })
  })
}

module.exports = db
