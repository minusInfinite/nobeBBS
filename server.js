import { config } from "dotenv";
import path from "path";
import express from "express";
import session from "express-session";
import exphbs from "express-handlebars";
import morgan from "morgan";
import routes from "./controllers/index.js";
import helpers from "./utils/helpers.js";
import sequelize from "./config/connection.js";
import passport from "passport";
import connectSessionSequelize from "connect-session-sequelize";
import "./config/passport.js";
import prisma from "./config/connection.js";

({ config }.config());

async function StartServer() {

    const SequelizeStore = connectSessionSequelize(session.Store);
    const app = express();
    const PORT = process.env.PORT || 3001;
    // Set up Handlebars.js engine with custom helpers
    const hbs = exphbs.create({ helpers });
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
    };
    app.use(session(sess));
    // Inform Express.js on which template engine to use
    app.engine("handlebars", hbs.engine);
    app.set("view engine", "handlebars");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    if (!process.env.VERCEL) {
        app.use(express.static(path.join(__dirname, "public")));
        app.use(morgan('dev'));
    }
    else {
        app.get('*', (req, res, next) => {
            if (req.method === 'GET') {
                res.setHeader('Cache-Control', 'max-age=0, s-max-age=1, stale-while-revalidate');
            }
            next();
        });
    }
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(routes);
    app.use("*", (req, res) => {
        res.status(404).render("404", {
            user: req.user ? req.user : undefined,
        });
    });

    app.listen(PORT, () => console.log(`Server Runnning http://localhost:${PORT}`))

}

StartServer().catch(e => console.error("Server Start Error", { cause: e }))

