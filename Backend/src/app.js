import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
); // to telling backend that data coming from client will be in json format
app.use(express.urlencoded({ extended: true })); // to tell backend that data coming from client will be in urlencoded format

app.use(express.static("public")); // to serve static files from public folder

app.use(cookieParser());

// routes

import userRouter from "./routes/user.routes.js";
import rewardRouter from "./routes/reward.routes.js";

app.use("/api/v2/users", userRouter);

app.use("/api/v2/reward", rewardRouter);

export { app };
