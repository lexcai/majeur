import User from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../../src/db";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Login failed, user not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Login failed, incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, userData: { email: user.email } });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
