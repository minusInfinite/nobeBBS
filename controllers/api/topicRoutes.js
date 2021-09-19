const router = require("express").Router()
const { Topic, Post, User } = require("../../models")
const { isAuth, isAdmin } = require("../middleware/auth")
const sequelize = require("../../config/connection")

// CREATE A TOPIC, MUST BE LOGGED IN AS ADMIN
router.post("/", isAdmin, (req, res) => {
    Topic.create({
        subject: req.body.subject,
    })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            res.status(500).json(err)
        })
})

// EDIT A TOPIC, MUST BE LOGGED IN AS ADMIN
router.put("/:id", isAdmin, (req, res) => {
    Topic.update(
        {
            subject: req.body.subject,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
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

// DELETE TOPIC, MUST BE LOGGED IN AS ADMIN
router.delete("/:id", isAdmin, (req, res) => {
    Topic.destroy({
        where: {
            id: req.params.id,
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
