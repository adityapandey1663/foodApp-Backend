import express from "express";
import cors from "cors";
import 'dotenv/config';
import path from "path";
import { fileURLToPath } from "url";

// Database & Routes
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// ---------------- App Config ----------------
const app = express();
const port = process.env.PORT || 4000;

// Fix __dirname (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- Middlewares ----------------
app.use(express.json());

// ✅ Allow BOTH frontends
app.use(
  cors({
    origin: [
      "https://food-app-admin-panel-bay.vercel.app",
      "https://food-app-frontend-two-mu.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ---------------- Database ----------------
connectDB();

// ---------------- Routes ----------------
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Serve uploaded images (used by Multer inside routes)
app.use("/images", express.static(path.join(__dirname, "uploads")));

// ---------------- Health Check ----------------
app.get("/", (req, res) => {
  res.send("API Working");
});

// ---------------- Start Server ----------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
