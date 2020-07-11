import express from "express";
import controller from "../controllers/controller";
const router = express.Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

router.use("/room", controller.auth, controller.roomPath);

router.get("/", controller.loginPath);

export default router;
