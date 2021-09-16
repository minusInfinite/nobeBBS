const router = require("express").Router()
const passport = require("passport")
const { isAuth, isAdmin } = require("./middleware/auth")
const { User } = require("../models")

// test route
router.get("/", (req, res) => {
    res.send("HELLO WORLD")
})
// test isAuth middleware
router.get("/protected", isAuth, (req, res) => {
    res.send("Protected Route!")
})
// test isAuth and isAdmin middleware
router.get("/admin/protected", isAuth, isAdmin, (req, res) => {
    res.send("Admin Protected Route!")
})
// render login form
router.get("/login", (req, res) => {
    res.render("login")
})
// render signup form
router.get("/signup", (req, res) => {
    res.render("signup")
})

// render update user form
router.get("/update", isAuth, (req, res) => {
    res.render("update")
})

// removes user from session and req

module.exports = router
