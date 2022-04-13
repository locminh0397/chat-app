import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    newMessage: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "off",
    },
  },
  { minimize: false }
);
export default mongoose.model("Users", UserSchema);
