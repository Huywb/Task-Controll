import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { ConnectDB } from './configs/ConnectDB.js'
import authRoutes from './routes/authRotes.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taksRoutes.js'
import reportRoutes from './routes/reportRoutes.js'


dotenv.config()
const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type","Authorization"]
}))
app.use(express.json())

const PORT = process.env.PORT || 5000

ConnectDB()
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/tasks',taskRoutes)
app.use('/api/v1/reports',reportRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})