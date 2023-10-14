require("dotenv").config()
const path = require("path")
const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")
const morgan = require("morgan")
const routes = require("./controllers")
const helpers = require("./utils/helpers")

const sequelize = require("./config/connection")
const passport = require("passport")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const app = express()
const PORT = process.env.PORT || 3001

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers })

/** @type {import("express-session").SessionOptions} */
const sess = {
    secret: process.env.CSECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // EXPIRES IN 1 DAY(1000ms * 60s * 60m * 24hr = 1 day)
        sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
}

app.use(session(sess))
// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (!process.env.VERCEL) {
    app.use(express.static(path.join(__dirname, "public")))
    app.use(morgan('dev'))
} else {
    app.get('*', (req, res, next) => {
        if (req.method === 'GET') {
            res.setHeader('Cache-Control', 'max-age=0, s-max-age=1, stale-while-revalidate')
        }
        next()
    })
}

// passport auth
require("./config/passport")

app.use(passport.initialize())
app.use(passport.session())
app.use(routes)

app.use("*", (req, res) => {
    res.status(404).render("404", {
        user: req.user ? req.user : undefined,
    })
})


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
        console.log(`Server Runnning http://localhost:${PORT}`)
    )
})
