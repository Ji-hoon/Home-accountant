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

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`PORT:${PORT}`);
});
