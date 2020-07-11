import express from "express";
import path from "path";
const router = express.Router();

router.use(
  "/room1",
  express.static(
    path.resolve(__dirname, "..", "..", "public", "views", "rooms")
  )
);
router.use(
  "/room2",
  express.static(
    path.resolve(__dirname, "..", "..", "public", "views", "rooms")
  )
);

router.get(
  "/",
  express.static(path.resolve(__dirname, "..", "..", "public", "views", "init"))
);

export default router;
