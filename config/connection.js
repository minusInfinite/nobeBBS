const Sequelize = require("sequelize")
require("dotenv").config()

let sequelize

if (process.env.DATABASE_URL || process.env.DB) {
    sequelize = new Sequelize(process.env.DATABASE_URL || process.env.DB)
} else {
    sequelize = new Sequelize(
        process.env.DBNAME,
        process.env.DBUSER,
        process.env.DBPASS,
        {
            host: "localhost",
            dialect: "postgres",
            port: 5432,
        }
    )
}

module.exports = sequelize
