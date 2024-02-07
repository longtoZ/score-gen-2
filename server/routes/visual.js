import express from "express"
import { visualYearController } from "../controllers/visualYear.js"

const router = express.Router()

router.get("/year", visualYearController)


export default router