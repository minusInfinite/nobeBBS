import express from "express";
import apiRoutes from "./api/index.js";
import homeRoutes from "./homeRoutes.js";
import makeAdmin from "../utils/makeAdmin.js";
const router = express.Router();
router.use(makeAdmin);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
export default router;
