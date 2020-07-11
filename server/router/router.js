import express from "express";
import controler from "../controllers/controller";
const router = express.Router();

router.use("/room", controler.roomPath);

router.get("/", controler.loginPath);

export default router;
