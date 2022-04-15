import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";

import Users from "./models/userModels.js";
import Message from "./models/messageModel.js";

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
    origin: "https://chatapp.locminh.xyz",
    method: ["GET", "POST"],
  },
});

const getLastMessagesFromRoom = async (room) => {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messageByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages
};

const sortRoomMessagesByDate = (messages) => {
  return messages?.sort((a, b) => {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];
    return date1 < date2 ? -1 : 1;
  });
};

app.get("/room", (req, res) => {
  res.json(rooms);
});

io.on("connection", (socket) => {
  socket.on("new-user", async () => {
    const members = await Users.find();
    io.emit("new-user", members);
  });

  socket.on("join-room", async (room) => {
    socket.join(room);
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-form", async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    });
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    //sending message
    io.to(room).emit("room-messages", roomMessages);

    socket.broadcast.emit("notification", room);
  });


  app.delete("/api/v1/logout", async (req, res) => {
    try {
      const { _id, newMessage } = req.body;
      const user = await Users.findById(_id);
      user.status = "off";
      user.newMessage = newMessage;
      await user.save();
      const members = await Users.find();
      socket.broadcast.emit("new-user", members);
      res.status(200).send();
    } catch (error) {
      console.log(error);
    }
  });
});

app.use("/api/v1/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Running");
});

server.listen(PORT, () => {
  console.log("server running on", PORT);
});
