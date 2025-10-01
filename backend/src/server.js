import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";



const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;
console.log("🔍 URI from .env:", process.env.MONGO_URI);

app.use(express.json());
console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅" : "❌ Missing");
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT)
  connectDB();
});