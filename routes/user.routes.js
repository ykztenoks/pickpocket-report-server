import { Router } from "express"
import { signup, login, verify } from "../services/auth.services.js"
import isAuth from "../middleware/isAuth.js"
const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/verify", isAuth, verify)

export default router
