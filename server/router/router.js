import express from "express";
import controller from "../controllers/controller";
const router = express.Router();

router.post("/register", controller.userRegister);

router.post("/login", controller.userLogin);

router.use("/registerUser", controller.RegisterPath);

router.use("/room", controller.roomPath);

router.use("/", controller.loginPath);

export default router;
