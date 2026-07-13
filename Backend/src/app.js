import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = [
  'https://pratifal.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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

app.get('/' , (req, res) => {
  res.send('API is running');
})

app.use("/api/v2/users", userRouter);

app.use("/api/v2/reward", rewardRouter);

export { app };
