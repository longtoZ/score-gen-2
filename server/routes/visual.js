import express from "express"
import { visualYearController } from "../controllers/visualYear.js"
import { visualCompeteController } from "../controllers/visualCompete.js"

const router = express.Router()

router.get("/year", visualYearController)
router.get("/compete", visualCompeteController)

export default router