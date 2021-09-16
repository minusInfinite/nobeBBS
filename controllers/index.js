const router = require("express").Router()
const apiRoutes = require("./api")
const homeRoutes = require("./homeRoutes")
const userRoutes = require("./userRoutes")
const postRoutes = require("./postRoutes")
const makeAdmin = require("../utils/makeAdmin")

router.use(makeAdmin)

router.use("/api", apiRoutes)
router.use("/", homeRoutes)
router.use("/users", userRoutes)
router.use("/posts", postRoutes)

module.exports = router
