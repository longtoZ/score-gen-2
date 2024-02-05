import express from "express"
import { suggestRangeController } from "../controllers/suggestRange.js"

const router = express.Router()

router.get("/range", suggestRangeController)

export default router