import express from "express";
import controller from "../controllers/controller";
const router = express.Router();

router.use("/room", controller.roomPath);

router.get("/", controller.loginPath);

export default router;
