import express from "express"
import {verifyToken} from "../middleware.js"
import { visualYearController } from "../controllers/visualYear.js"
import { visualCompeteController } from "../controllers/visualCompete.js"
import { visualAreaController } from "../controllers/visualArea.js"
import { visualAreaAllController } from "../controllers/visualAreaAll.js"
import { visualGroupController } from "../controllers/visualGroup.js"
import { visualSpecialController } from "../controllers/visualSpecial.js"

const router = express.Router()

router.get("/year", verifyToken, visualYearController)
router.get("/compete", verifyToken, visualCompeteController)
router.get("/area", verifyToken, visualAreaController)
router.get("/areaAll", verifyToken, visualAreaAllController)
router.get("/group", verifyToken, visualGroupController)
router.get("/special", verifyToken, visualSpecialController)

export default router