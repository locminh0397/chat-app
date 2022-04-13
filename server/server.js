import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const rooms = ["general", "javascript", "typescript", "c#"];

app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.DB, { autoIndex: true })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

app.use("/api/v1/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Running");
});

server.listen(PORT, () => {
  console.log("server running on", PORT);
});
