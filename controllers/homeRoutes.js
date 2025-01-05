const router = require("express").Router()
const { Topic, Post, User, Comment } = require("../models")
const { isAuth, isAdmin } = require("./middleware/auth")
const sequelize = require("../config/connection")


router.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('opps')
})

router.get("/", async (req, res, next) => {
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
                        as: "poster",
                    },
                },
            ],
            order: [[Post, "created_at", "DESC"]],
            group: ["topic.id", "posts.id", "posts.poster.id"],
        })

        const topics = topicData.map((topic) => topic.get({ plain: true }))
        res.render("homepage", {
            topics,
            user: req.user,
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
})

// FIND POST BY TOPIC BY ID
router.get("/topic/:topic_id", async (req, res, next) => {
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
                    include: [
                        {
                            model: User,
                            attributes: ["username"],
                            as: "commentor",
                        },
                    ],
                },
                { model: User, attributes: ["username"], as: "poster" },
            ],
            order: [[Comment, "created_at", "DESC"]],
            group: ["post.id", "poster.id", "comments.id", "comments.commentor.id"],
        })

        const posts = postsData.map((post) => post.get({ plain: true }))

        res.render("forum", {
            posts,
            user: req.user,
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.get("/topic/:topic_id/post/:post_id", async (req, res, next) => {
    try {
        const topicSubject = await Topic.findOne({
            where: { id: req.params.topic_id },
            attributes: ["id", "subject"],
        })
        const postsData = await Post.findOne({
            where: { id: req.params.post_id },
            attributes: ["id", "subject", "content", "createdAt", "topic_id"],
            //include user data
            include: [
                {
                    model: User,
                    attributes: ["id", "username", "avatar"],
                    as: "poster",
                },
            ],
        })

        const commentData = await Comment.findAll({
            where: { post_id: req.params.post_id },
            attributes: ["id", "comment_text", "createdAt"],
            include: {
                model: User,
                as: "commentor",
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
        next(err)
    }
})

router.get("/user-dashboard", isAuth, async (req, res, next) => {
    try {
        const { id } = req.user
        const userData = await User.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: { model: Post },
        })

        const getComments = await Post.findAll({
            include: {
                model: Comment,
                where: { user_id: id }
            }
        }
        )

        const userPosts = userData.dataValues.posts
        const userComment = getComments.map((post) => post.get({ plain: true }))

        /** @type {Array} */
        const posts = userPosts.map((post) => post.get({ plain: true })).concat(userComment)

        res.render("userdash", {
            posts,
            user: req.user,
        })
    } catch (err) {
        console.log(err)
        next(err)
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
