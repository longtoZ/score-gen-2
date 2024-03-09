import express from "express"
import { visualYearController } from "../controllers/visualYear.js"
import { visualCompeteController } from "../controllers/visualCompete.js"
import { visualAreaController } from "../controllers/visualArea.js"
import { visualAreaAllController } from "../controllers/visualAreaAll.js"
import { visualGroupController } from "../controllers/visualGroup.js"
import { visualSpecialController } from "../controllers/visualSpecial.js"

const router = express.Router()

router.get("/year", visualYearController)
router.get("/compete", visualCompeteController)
router.get("/area", visualAreaController)
router.get("/areaAll", visualAreaAllController)
router.get("/group", visualGroupController)
router.get("/special", visualSpecialController)

export default router