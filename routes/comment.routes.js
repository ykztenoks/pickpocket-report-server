import { Router } from "express"
import { create, like, remove } from "../services/comment.services.js"
import isOwner from "../middleware/isOwner.js"
import isAuth from "../middleware/isAuth.js"
const router = Router()

router.use(isAuth)

router.post("/:reportId", create)
router.patch("/:id", like)
router.delete("/:id/:reportId", isOwner, remove)

export default router
