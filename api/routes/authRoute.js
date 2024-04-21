import express from "express";
import {
  signin,
  signup,
  google,
  signout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout", signout);
router.post("/google", google);

export default router;
