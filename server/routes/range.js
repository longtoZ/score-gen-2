import express from "express"
import { rangeController } from "../controllers/range.js"

const router = express.Router()

router.get("/", rangeController)


export default router