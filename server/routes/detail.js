import express from "express"
import { detailController } from "../controllers/detail.js"

const router = express.Router()

router.get("/", detailController)

export default router