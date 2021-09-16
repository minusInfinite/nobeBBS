const router = require("express").Router()
const passport = require("passport")
const { User } = require("../../models")

// CREATE A NEW USER
router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body, {
            fields: ["username", "password"],
        })
        const user = userData.get({ plain: true })
        req.logIn(user, (err) => {
            if (err) {
                return res.status(400).json(err)
            }
            User.update({ last_login: Date.now() }, { where: { id: user.id } })
            res.status(200).json(user)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})
// LOG IN EXISTING USER
router.post("/login", passport.authenticate("local"), (req, res) => {
    if (req.user) {
        User.update({ last_login: Date.now() }, { where: { id: req.user.id } })
        res.status(200).json({ message: "Login Successful!" })
    } else {
        res.json({ msg: "failed to login" })
    }
})

router.patch("/updatepass", async (req, res) => {
    try {
        if (req.user) {
            const user = await User.findByPk(req.user.id, { plain: true })
            const isValid = user.validatePassword(req.body.currentPassword)
            if (isValid) {
                user.password = req.body.newPassword
                await user.save()
                res.status(200).json("success")
            } else {
                res.status(400).json({ msg: "failed to update" })
            }
        } else {
            res.status(400).json({ msg: "failed to update" })
        }
    } catch (err) {
        res.status(500).json({
            errors: [
                {
                    message: err,
                },
            ],
        })
    }
})

router.patch("/updateavatar", async (req, res) => {
    try {
        if (req.user) {
            const user = await User.findByPk(req.user.id, { plain: true })
            user.avatar = req.body.avatar
            await user.save()
            res.status(200).json("success")
        } else {
            res.status(400).json({ msg: "failed to update" })
        }
    } catch (err) {
        res.status(500).json({
            errors: [
                {
                    message: err,
                },
            ],
        })
    }
})

router.post("/logout", (req, res) => {
    User.update({ last_login: Date.now() }, { where: { id: req.user.id } })
    req.logout()
    req.session.destroy((err) => {
        if (err) {
            return res.status(404).end()
        }
        res.status(204).end()
    })
})

module.exports = router
