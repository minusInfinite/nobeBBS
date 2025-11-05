const Sequelize = require("sequelize")
require("dotenv").config()

let sequelize

if (process.env.DATABASE_URL || process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL || process.env.DB_URL)
} else {
    sequelize = new Sequelize('sqlite::memory')
}

module.exports = sequelize
