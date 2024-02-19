import express from "express"
import {verifyToken} from "../middleware.js"
import { searchController } from "../controllers/search.js"

const router = express.Router()

router.get("/", verifyToken, searchController)

export default router