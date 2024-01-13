import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
//import "dotenv/config";

// const { PORT, MONGODB_URL, FRONTEND_URL } = process.env;
// if (!PORT || !MONGODB_URL || !FRONTEND_URL) {
//   console.error("no env var");
//   process.exit();
// }

// mongoose.connect(MONGODB_URL);
// mongoose.connection.on("connected", () => {
//   console.log("Successfully connected to MongoDB");
// });

const app = express();

// app.use(errorLogger);

// app.use(express.json());
// app.use(
//   cors({
//     origin: [FRONTEND_URL],
//     credentials: true,
//   }),
// );
//app.use(cookieParser());

//app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello, Home accountant server!");
});
app.listen("5000", () => {
  console.log(`PORT:5000`);
});
