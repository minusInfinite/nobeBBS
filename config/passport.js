import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/index.js";
import prisma from "./connection.js";
const LocalStrategy = { Strategy }.Strategy;
const verifyCallBack = (username, password, done) => {
    // query DB for user
    prisma.user.findUnique({ where: { username: username } })
        .then((user) => {
            if (!user) {
                return done(null, false);
            } // if no matching user return false
            const isValid = user.validatePassword(password); // call the validatePassword method on the user instance
            if (isValid) {
                return done(null, user); // if password is valid return user
            }
            else {
                return done(null, false); // if password doesnt match return false
            }
        })
        .catch((err) => {
            done(err); // server error
        });
};
// create strategy for verifying users
const strategy = new LocalStrategy(verifyCallBack);
// use this strategy as middleware
passport.use(strategy);
// functions for storing and reading user from express session
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((userId, done) => {
    prisma.user.findUnique({
        where: { id: userId },
        omit: {
            password: true
        }
    })
        .then((userData) => {
            const user = userData;
            done(null, user);
        })
        .catch((err) => done(err));
});
