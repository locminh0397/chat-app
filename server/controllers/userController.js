import Users from "../models/userModels.js";
import bcryptjs from "bcryptjs";

export const Register = async (req, res) => {
  try {
    const { username, email, password, picture } = req.body;

    const userCheck = await Users.findOne({ username });
    if (userCheck)
      return res.json({ msg: "Username already exists!", success: false });

    const emailCheck = await Users.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already exists!", success: false });

    const hashPassword = await bcryptjs.hash(password, 12);
    const user = await Users.create({
      username,
      email,
      password: hashPassword,
      picture,
    });
    return res
      .status(201)
      .json({ msg: "Create account successfully!", success: true, user });
  } catch (error) {
    res.status(400).json({ msg: error.message, success: false });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user)
      return res.json({
        msg: "Username or password incorrect!",
        success: false,
      });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.json({
        msg: "Username or password incorrect!",
        success: false,
      });
    await Users.findByIdAndUpdate({_id: user._id}, {status: "on"})
    console.log(user)
    res.status(200).json({ msg: "Login successfully!", success: true, user });
  } catch (error) {
    res.status(400).json({ msg: error.message, success: false });
  }
};
