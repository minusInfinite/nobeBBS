const router = require("express").Router()
const apiRoutes = require("./api")
const homeRoutes = require("./homeRoutes")
const makeAdmin = require("../utils/makeAdmin")

router.use(makeAdmin)

router.use("/api", apiRoutes)
router.use("/", homeRoutes)

module.exports = router
