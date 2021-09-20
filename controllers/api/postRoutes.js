const router = require("express").Router()
const { Post, Comment } = require("../../models")
const { isAuth } = require("../middleware/auth")

// create new post
router.post("/", async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.user.id,
        })

        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json(error)
    }
})
// edit a post
router.post("/edit/:id", async (req, res) => {
    try {
        await Post.update(
            { subject: req.body.subject, content: req.body.content },
            { where: { id: req.params.id } }
        )
        res.status(200).json({ msg: "success" })
    } catch (error) {
        res.status(400).json(error)
    }
})

// get post by ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete("/:id", isAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
            user_id: req.user.id,
        },
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id" })
                return
            }
            res.json(dbPostData)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

module.exports = router
