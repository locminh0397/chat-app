import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  content: String,
  from: {},
  socketId: String,
  time: String,
  date: String,
  to: String,
});

export default mongoose.model("Message", MessageSchema);
