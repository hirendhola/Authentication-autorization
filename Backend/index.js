const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/user.route.js")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use("/", router)

mongoose
    .connect(process.env.MONGO_CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`)
        })
    })
    .catch(error => console.log(error))

const PORT = process.env.PORT || 3000
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "server is running"
    })
})

