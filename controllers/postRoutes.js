const { Post } = require("../models")

const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("HELLO WORLD")
})

router.get("/new", (req, res) => {
    res.render("newPost")
})

router.get("/edit/:id", async (req, res) => {
    const post = await Post.findByPk(req.params.id, {
        raw: true,
    })
    res.render("editPost", { post })
})

module.exports = router
