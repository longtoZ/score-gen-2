import express from "express"
import {verifyToken} from "../middleware.js"
import { suggestController } from "../controllers/suggest.js"

const router = express.Router()

router.get("/", suggestController)


export default router