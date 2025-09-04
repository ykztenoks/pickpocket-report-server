import { Router } from "express"
import { signup } from "../services/auth.services.js"
const router = Router()

router.post("/signup", signup)

export default router
