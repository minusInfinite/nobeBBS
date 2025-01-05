import express from "express";
import { Comment } from "../../models/index.js";
import { isAuth, isAdmin } from "../middleware/auth.js";
const router = express.Router();
// CREATE new comments
router.post("/", isAuth, async (req, res) => {
    // check session
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            // use the id from the session
            user_id: req.user.id,
        });
        res.status(201).json(newComment);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
// DELETE COMMENT
router.delete("/:id", isAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id,
            user_id: req.user.id,
        },
    })
        .then((dbCommentData) => {
        if (!dbCommentData) {
            res.status(404).json({
                message: "No comment found with this id",
            });
            return;
        }
        res.json(dbCommentData);
    })
        .catch((err) => {
        res.status(500).json(err);
    });
});
export default router;
