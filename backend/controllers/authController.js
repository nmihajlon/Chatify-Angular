import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import AvailableUsers from "../models/AvailableUsers.js";

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "15m" });
};

export const registerUser = async (req, res) => {
  console.log(req.body);
  const { username, password, email } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });

  await newUser.save();
  await AvailableUsers.create({ user: newUser._id });
  res.status(201).json({ message: "Successfully registered" });
};

export const loginUser = async (req, res) => {
  const { username, password, rememberMe } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Incorrect username or password." });
  }

  const accessToken = generateAccessToken(user._id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000,
  });

  if (rememberMe) {
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  res.json({ message: "Successfully login" });
};

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Nema refresh tokena." });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken(decoded.id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Access token osvežen." });
  } catch (err) {
    res.status(401).json({ message: "Neispravan refresh token." });
  }
};


export const logoutUser = (req, res) => {
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ message: "Odjavljen uspešno." });
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
}