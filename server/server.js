import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const rooms = ["general", "javascript", "typescript", "c#"];

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    method: ["GET", "POST"],
  },
});

server.listen(PORT, () => {
  console.log("server running on", PORT);
});
