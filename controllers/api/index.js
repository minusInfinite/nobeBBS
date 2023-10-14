const router = require("express").Router()
const userRoutes = require("./userRoutes")
const topicRoutes = require("./topicRoutes")
const postRoutes = require("./postRoutes")
const commentRoutes = require("./commentRoutes")

// router.use((req, res, next) => {
//     res.setHeader('Content-Type', 'application/json')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE')
//     next()
// })

router.use("/user", userRoutes)
router.use("/topic", topicRoutes)
router.use("/post", postRoutes)
router.use("/comment", commentRoutes)

module.exports = router
