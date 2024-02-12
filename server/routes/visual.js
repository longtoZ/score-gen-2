import express from "express"
import { visualYearController } from "../controllers/visualYear.js"
import { visualCompeteController } from "../controllers/visualCompete.js"
import { visualAreaController } from "../controllers/visualArea.js"
import { visualGroupController } from "../controllers/visualGroup.js"

const router = express.Router()

router.get("/year", visualYearController)
router.get("/compete", visualCompeteController)
router.get("/area", visualAreaController)
router.get("/group", visualGroupController)

export default router