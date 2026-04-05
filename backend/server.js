import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { ConnectDB } from "./configs/ConnectDB.js";
import authRoutes from "./routes/authRotes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taksRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

ConnectDB();
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/reports", reportRoutes);

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
