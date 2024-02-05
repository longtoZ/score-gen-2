import express from "express"
import searchRouter from "./routes/search.js"
import rangeRouter from "./routes/range.js"
import detailRouter from "./routes/detail.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/search", searchRouter)
app.use("/api/suggest", rangeRouter)
app.use("/api/detail", detailRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})