const pg = require("pg")
const db = new pg.Pool({
    database: "trivia"
})

module.exports = db