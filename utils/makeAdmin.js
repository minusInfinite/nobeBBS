const { User } = require("../models")

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const makeAdmin = async (req, res, next) => {
    try {
        const adminPass = process.env.ADMINPASS
        const hasAdmin = await User.findOne({
            where: { username: "administrator" },
        })

        if (!hasAdmin) {
            await User.create(
                {
                    username: "administrator",
                    password: adminPass,
                    is_admin: true,
                    avatar: "/img/default_avatar.png",
                },
                { individualHooks: true }
            )
            console.log("Admin created")
        }
    } catch (err) {
        console.log(err)
        next()
    } finally {
        next()
    }
}

module.exports = makeAdmin
