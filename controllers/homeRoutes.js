const router = require("express").Router()
const { Topic, Post, User } = require("../models")
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
        console.log(req.session)
        res.render("homepage", {
            topics,
            logged_in: req.session.logged_in,
            is_admin: req.session.is_admin,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// FIND ONE TOPIC BY ID
router.get("/topics/:id", (req, res) => {
    Topic.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "subject", "created_at"],
        // INCLUDE ALL POSTS THAT BELONG TO TOPIC
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
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id" })
                return
            }
            res.json(dbPostData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/")
        return
    }

    res.render("login")
})

module.exports = router
