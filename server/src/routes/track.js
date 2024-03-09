import express from "express"
import { trackGetController } from "../controllers/trackGet.js"
import { trackPutController } from "../controllers/trackPut.js"
import { trackPostController } from "../controllers/trackPost.js"

const router = express.Router()

router.get("/get", trackGetController)
router.put("/put",  trackPutController)
router.post("/post",  trackPostController)

export default router