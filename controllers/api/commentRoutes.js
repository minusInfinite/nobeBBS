const router = require("express").Router()
const { Comment } = require("../../models")
const { isAuth, isAdmin } = require("../middleware/auth")

// GET all comments
router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll({})
        res.json(dbCommentData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// CREATE new comments
router.post("/", isAuth, (req, res) => {
    // check session
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        // use the id from the session
        user_id: req.user.id,
    })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })
})

// DELETE COMMENT
router.delete("/:id", isAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbCommentData) => {
            if (!dbCommentData) {
                res.status(404).json({
                    message: "No comment found with this id",
                })
                return
            }
            res.json(dbCommentData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router
