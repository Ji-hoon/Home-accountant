import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./auth/auth.router.js";
import expenseRouter from "./expenses/expense.router.js";
import errorHandler from "./middleware/errorHandler.js";
import assetRouter from "./assets/asset.router.js";
import groupRouter from "./group/group.router.js";
import userRouter from "./user/user.router.js";
import categoryRouter from "./categories/categories.router.js";
import assetTypeRouter from "./asset_types/asset_types.router.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { PORT, MONGODB_URL, FRONTEND_URL } = process.env;
if (!PORT || !MONGODB_URL || !FRONTEND_URL) {
  console.error("no env var");
  process.exit();
}

mongoose.connect(MONGODB_URL);
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/assets", assetRouter);
app.use("/api/groups", groupRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/asset_types", assetTypeRouter);

app.use(errorHandler);

app.use(express.static(join(__dirname, "./dist")));
app.use("/assets", express.static("dist/assets/"));
app.use(
  express.static(join(__dirname, "/"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  }),
);

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "/index.html"));
});

app.listen(PORT as unknown as number, "0.0.0.0", () => {
  console.log(`PORT:${PORT} IP: "0.0.0.0"`);
});
