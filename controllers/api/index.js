import express from "express";
import userRoutes from "./userRoutes.js";
import topicRoutes from "./topicRoutes.js";
import postRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoutes.js";
const router = express.Router();
// router.use((req, res, next) => {
//     res.setHeader('Content-Type', 'application/json')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE')
//     next()
// })
router.use("/user", userRoutes);
router.use("/topic", topicRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
export default router;
