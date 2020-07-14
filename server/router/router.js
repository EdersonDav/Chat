import express from "express";
import controller from "../controllers/controller";
const router = express.Router();

router.post("/register", controller.userRegister);

router.post("/login", controller.userLogin);

router.use("/", controller.RegisterPath);

router.use("/room", controller.roomPath);

export default router;
