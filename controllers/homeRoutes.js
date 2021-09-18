const router = require("express").Router()
const { Topic, Post, User, Comment } = require("../models")
const { isAuth, isAdmin } = require("./middleware/auth")
const sequelize = require("../config/connection")

router.get("/", async (req, res) => {
    try {
        const topicData = await Topic.findAll({
            // INCLUDE ALL POSTS THAT BELONG TO TOPIC
            attributes: [
                "id",
                "subject",
                "created_at",
                [
                    sequelize.fn("COUNT", sequelize.col("posts.id")),
                    "post_count",
                ],
            ],
            include: [
                {
                    model: Post,
                    // INCLUDE ALL USERS THAT BELONG TO POST
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
            order: [[Post, "created_at", "DESC"]],
            group: ["Topic.id"],
        })

        const topics = topicData.map((topic) => topic.get({ plain: true }))
        res.render("homepage", {
            topics,
            user: req.user,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// FIND POST BY TOPIC BY ID
router.get("/topic/:topic_id", async (req, res) => {
    try {
        const postsData = await Post.findAll({
            where: { topic_id: req.params.topic_id },
            attributes: [
                "id",
                "subject",
                "createdAt",
                "topic_id",
                [
                    sequelize.fn("COUNT", sequelize.col("comments.id")),
                    "reply_count",
                ],
            ],
            // INCLUDE ALL POSTS THAT BELONG TO TOPIC
            include: [
                {
                    model: Comment,
                },
                { model: User, attributes: ["username"] },
            ],
            order: [[Comment, "created_at", "DESC"]],
            group: ["Post.id"],
        })

        const posts = postsData.map((post) => post.get({ plain: true }))

        res.render("forum", {
            posts,
            user: req.user,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get("/topic/:topic_id/post/:post_id", async (req, res) => {
    try {
        const topicSubject = await Topic.findOne({
            where: { id: req.params.topic_id },
            attributes: ["id", "subject"],
        })
        const postsData = await Post.findOne({
            where: { id: req.params.post_id },
            attributes: ["id", "subject", "content", "createdAt", "topic_id"],
            // Get all comments
            include: [
                { model: User, attributes: ["id", "username", "avatar"] },
            ],
        })

        const commentData = await Comment.findAll({
            where: { post_id: req.params.post_id },
            attributes: ["id", "comment_text", "createdAt"],
            include: {
                model: User,
                attributes: ["id", "username", "avatar"],
            },
        })

        const topic = topicSubject.get({ plain: true })
        const post = postsData.get({ plain: true })
        const comments = commentData.map((comment) =>
            comment.get({ plain: true })
        )

        res.render("post", {
            topic,
            post,
            comments,
            user: req.user,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get("/signup", (req, res) => {
    if (req.user) {
        res.redirect("/")
        return
    }

    res.render("signup")
})

router.get("/login", (req, res) => {
    if (req.user) {
        res.redirect("/")
        return
    }

    res.render("login")
})

module.exports = router
