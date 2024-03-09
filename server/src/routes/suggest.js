import express from "express"
import { suggestController } from "../controllers/suggest.js"

const router = express.Router()

router.get("/", suggestController)


export default router