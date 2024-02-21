import express from "express";
import searchRouter from "./routes/search.js";
import suggestRouter from "./routes/suggest.js";
import visualRouter from "./routes/visual.js";
import detailRouter from "./routes/detail.js";
import trackRouter from "./routes/track.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const allowedOrigins = [process.env.CLIENT];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/search", searchRouter);
app.use("/api/suggest", suggestRouter);
app.use("/api/visual", visualRouter);
app.use("/api/detail", detailRouter);
app.use("/api/track", trackRouter);
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).send("Not allowed");
  } else {
    next(err);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
