import { Router } from "express";
import { isAuth, isAdmin } from "./middleware/auth.js";
import prisma from "../config/connection.js";

const router = Router();

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('opps');
});

router.get("/", async (req, res, next) => {
    try {
        const topicData = await prisma.topic.findMany({
            // INCLUDE ALL POSTS THAT BELONG TO TOPIC
            select: {
                id: true,
                subject: true,
                createdAt: true,
                // INCLUDE ALL USERS THAT BELONG TO POST
                post: {
                    select: {
                        poster: {
                            select: {
                                username: true
                            }
                        }
                    }
                },
                _count: { post: true },
            },
            orderBy: { post: { createdAt: "DESC" } }
        });

        const topics = topicData.map((topic) => topic);

        res.render("homepage", {
            topics,
            user: req.user,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

// FIND POST BY TOPIC BY ID
router.get("/topic/:topicId", async (req, res, next) => {
    try {
        const { topicId } = req.params
        const postsData = await prisma.post.findMany({
            where: { topicId: topicId },
            // INCLUDE ALL POSTS THAT BELONG TO TOPIC
            include: {
                comments: {
                    select: {
                        commentor: {
                            select: {
                                username: true
                            }
                        },
                        createdAt: true
                    },
                },
                poster: {
                    select: {
                        username: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            },
            orderBy: {
                comments: {
                    createdAt: 'desc',
                }
            }
        });

        const posts = postsData.map((post) => post);

        res.render("forum", {
            posts,
            user: req.user,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

router.get("/topic/:topicId/post/:postId", async (req, res, next) => {
    try {
        const { topicId, postId } = req.params

        const topicSubject = await prisma.topic.findUnique({
            where: { id: topicId },
            select: {
                id: true,
                subject: true,
            }
        });

        const postsData = await prisma.post.findUnique({
            where: { id: postId },
            //include user data
            include: {
                poster: {
                    select: {
                        id: true,
                        avatar: true,
                        username: true
                    }
                }
            },
        });

        const commentData = await prisma.comment.findMany({
            where: { postId: postId },
            include: {
                commentor: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                }
            },
        });

        const topic = topicSubject;
        const post = postsData;
        const comments = commentData.map((comment) => comment);
        res.render("post", {
            topic,
            post,
            comments,
            user: req.user,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

router.get("/user-dashboard", isAuth, async (req, res, next) => {
    try {

        const userPosts = await prisma.post.findMany({
            where: { userId: req.user.id },
            include:
            {
                comments: true
            },

        });

        const posts = userPosts.map((post) => post);

        res.render("userdash", {
            posts,
            user: req.user,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

router.get("/signup", (req, res) => {
    if (req.user) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

router.get("/login", (req, res) => {
    if (req.user) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

export default router;
