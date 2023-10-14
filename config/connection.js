const Sequelize = require("sequelize")
require("dotenv").config()

let sequelize

if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL)
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
