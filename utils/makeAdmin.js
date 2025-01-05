import prisma from "../config/connection.js";
import { User } from "../models/index.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const makeAdmin = async (req, res, next) => {
    try {
        const adminPass = process.env.ADMINPASS;
        const hasAdmin = await prisma.user.findUnique({
            where: { username: "administrator" },
        });
        if (!hasAdmin) {
            await User.create({
                username: "administrator",
                password: adminPass,
                is_admin: true,
                avatar: "/img/default_avatar.png",
            }, { individualHooks: true });
            console.log("Admin created");
        }
    }
    catch (err) {
        console.log(err);
        next();
    }
    finally {
        next();
    }
};
export default makeAdmin;
