import { Router } from "express";
import User from "../../models/User.js";
import bcrypt from "bcrypt"
import passport from "passport";
import { isAdmin, isAuth } from "../middleware/auth.js";

const router = Router()
const UserControler = new User()

// CREATE A NEW USER
router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body, {
            fields: ["username", "password"],
        });
        const user = userData.get({ plain: true });
        req.logIn(user, (err) => {
            if (err) {
                return res.status(400).json(err);
            }
            User.update({ last_login: Date.now() }, { where: { id: user.id } });
            res.status(200).json(user);
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});
// LOG IN EXISTING USER
router.post("/login", passport.authenticate("local"), (req, res) => {
    if (req.user) {
        User.update({ last_login: Date.now() }, { where: { id: req.user.id } });
        res.status(200).json({ message: "Login Successful!" });
    }
    else {
        res.json({ msg: "failed to login" });
    }
});

router.patch("/updatepass", isAuth, async (req, res) => {
    try {
        const { newPassword, currentPassword } = req.body

        if (req.user) {
            const user = await User.findById(req.user.id);
            const isValid = await User.validatePassword(currentPassword, user.password);
            if (isValid) {
                user.password = newPassword;
                await user.save();
                res.status(200).json("success");
            }
            else {
                res.status(400).json({ msg: "failed to update" });
            }
        }
        else {
            res.status(400).json({ msg: "failed to update" });
        }
    }
    catch (err) {
        res.status(500).json({
            errors: [
                {
                    message: err,
                },
            ],
        });
    }
});
router.patch("/setadmin", isAuth, isAdmin, async (req, res) => {
    try {
        const { id } = req.user

        const user = await UserControler.getRole(id);

        const adminStatus = user.isAdmin;

        if (!adminStatus) {
            user.isAdmin = true;
            await UserControler.save(id);
        }
        else {
            user.isAdmin = false;
            await UserControler.save(id);
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({
            errors: [{ message: err }],
        });
    }
});
router.patch("/updateavatar", isAuth, async (req, res) => {
    try {
        const { id, avatar } = req.user
        if (req.user) {
            const user = await UserControler.findById(id);

            user.avatar = avatar;

            await UserControler.save(user);

            res.status(200).json("success");
        }
        else {
            res.status(400).json({ msg: "failed to update" });
        }
    }
    catch (err) {
        res.status(500).json({
            errors: [
                {
                    message: err,
                },
            ],
        });
    }
});
router.post("/logout", async (req, res, next) => {
    const { id } = req.user

    await UserControler.logOut(id)

    req.logout((err) => {
        if (err) {
            return next(err);
        }
        return;
    });

    req.session.destroy((err) => {
        if (err) {
            return res.status(404).end();
        }
        res.status(204).end();
    });
});
export default router;
