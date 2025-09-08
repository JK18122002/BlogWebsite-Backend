import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

// Middleware
app.use(cookieParser());

// ✅ Allow all origins
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// For non-file requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// ✅ Serve frontend only if it exists
const frontendPath = path.join(__dirname, "frontend", "dist");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
  connectDB();
});
