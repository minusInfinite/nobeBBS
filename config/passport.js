import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/index.js";
import prisma from "./connection.js";

const LocalStrategy = { Strategy }.Strategy;

const verifyCallBack = async (username, password, done) => {
    try {    // query DB for user
        const user = await prisma.user.findUnique({ where: { username: username } })
        if (!user) {
            return done(null, false);
        } // if no matching user return false

        const isValid = User.validatePassword(password, user.password); // call the validatePassword method on the user instance
        if (!isValid) {
            return done(null, false); // if password is valid return user
        }
        return done(null, false); // if password doesnt match return false
    } catch (err) {
        done(err); // server error
    };
};
// create strategy for verifying users
const strategy = new LocalStrategy(verifyCallBack);
// use this strategy as middleware
passport.use(strategy);
// functions for storing and reading user from express session
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (userId, done) => {
    try {
        const user = prisma.user.findUnique({
            where: { id: userId },
            omit: {
                password: true
            }
        })
        if (!user) {
            throw new Error("Error: No User Found")
        }
        done(null, user);
    } catch (err) {
        done(err)
    }
});
