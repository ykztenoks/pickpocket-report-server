import { Router } from "express"
import isAuth from "../middleware/isAuth.js"
import isOwner from "../middleware/isOwner.js"

import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../services/report.services.js"
const router = Router()

router.get("/", getAll)
router.get("/:id", getById)
router.post("/", isAuth, create)
router.patch("/:id", isAuth, isOwner, update)
router.delete("/:id", isAuth, isOwner, remove)

export default router
