import express from "express";
import { signupcontroller, logincontroller, test } from "../controllers/authcontroller.js"
import { requireSignup, isAdmin } from "../middlewares/authMiddleware.js"
const router = express.Router()


router.post("/signup", signupcontroller)

//LOGIN

router.post("/login", logincontroller)

router.get("/test", requireSignup, isAdmin, test)

router.get("/user-auth", requireSignup, (req, res) => {
    res.status(200).send({ ok: true });
  });

  router.get("/admin-auth", requireSignup,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });


export default router