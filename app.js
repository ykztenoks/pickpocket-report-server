import express from "express"
import morgan from "morgan"
import connectDB from "./db/db.connect.js"
import helmet from "helmet"
import userRouter from "./routes/user.routes.js"
import reportRouter from "./routes/report.routes.js"
import commentRouter from "./routes/comment.routes.js"
import cors from "cors"
import "dotenv/config"

const app = express()

app.use(morgan("dev"))
app.use(helmet())
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }))

app.get("/health", async (req, res) => {
  try {
    return res.status(200).json({ message: "server is good!" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "whats going on w the server???" })
  }
})

app.use("/user", userRouter)
app.use("/report", reportRouter)
app.use("/comment", commentRouter)

app.listen(process.env.PORT, () => {
  console.clear()
  connectDB()
  console.log(`Server up, running on ${process.env.PORT}`)
})
