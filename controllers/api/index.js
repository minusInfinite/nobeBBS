const router = require("express").Router()
const userRoutes = require("./userRoutes")
const topicRoutes = require("./topicRoutes")
const postRoutes = require("./postRoutes")
const commentRoutes = require("./commentRoutes")

router.use("/user", userRoutes)
router.use("/topic", topicRoutes)
router.use("/post", postRoutes)
router.use("/comment", commentRoutes)

module.exports = router
