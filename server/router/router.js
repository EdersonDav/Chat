import express from "express";
import controller from "../controllers/controller";
const router = express.Router();

router.post("/register", (req, res) => {
  res.send("register");
});

router.post("/login", (req, res) => {
  res.send("login");
});

router.use("/room", controller.roomPath);

router.get("/", controller.loginPath);

export default router;
