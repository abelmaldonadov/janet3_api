const db = require("./db")

const meta = async () => {
  return {
    // Aux
    coins: await db("SELECT * FROM aux_coins"),
    levels: await db("SELECT * FROM aux_levels"),
    models: await db("SELECT * FROM aux_models"),
    roles: await db("SELECT * FROM aux_roles"),
    seen: await db("SELECT * FROM aux_seen"),
    states: await db("SELECT * FROM aux_states"),
    tracking: await db("SELECT * FROM aux_tracking"),
    transactionTypes: await db("SELECT * FROM aux_transaction_types"),
    // Conf
    routes: await db("SELECT * FROM conf_routes"),
  }
}

module.exports = meta
