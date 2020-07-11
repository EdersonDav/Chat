import express from "express";
import controller from "../controllers/controller";
const router = express.Router();

router.post("/register", controller.userRegister);

router.post("/login", controller.userLogin);

router.use("/room", controller.roomPath);

router.get("/", controller.loginPath);

export default router;
