// check if user is authenticated
module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({ msg: "Not Logged In" })
    }
}
// check if user is admin
module.exports.isAdmin = (req, res, next) => {
    if (req.user.is_admin) {
        next()
    } else {
        res.status(401).json({ msg: "Administrator Required" })
    }
}
