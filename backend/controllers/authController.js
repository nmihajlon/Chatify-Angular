import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import AvailableList from "../models/AvailableList.js";
import { getIo } from "../socket.js";

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
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

  const allUsers = await User.find({ _id: { $ne: newUser._id } });

  await AvailableList.create({
    owner: newUser._id,
    users: allUsers.map((u) => u._id),
  });

  await Promise.all(
    allUsers.map((u) =>
      AvailableList.updateOne(
        { owner: u._id },
        { $addToSet: { users: newUser._id } }
      )
    )
  );

  const io = getIo();
  allUsers.forEach((u) => {
    io.to(u._id.toString()).emit("availableListUpdated");
  });

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

  const refreshToken = generateRefreshToken(user._id);
  console.log("Pristigli refreshToken:", refreshToken);

  const refreshTokenExpiry = rememberMe
    ? 30 * 24 * 60 * 60 * 1000 
    : 15 * 60 * 1000;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // true u produkciji
    sameSite: "Strict",
    maxAge: refreshTokenExpiry,
  });

  res.json({ message: "Successfully login" });
};

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("🔐 Primljen refresh token iz cookie-ja:", refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ message: "Nema refresh tokena." });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    console.log("✅ Refresh token validan. Dekodovan payload:", decoded);

    const newAccessToken = generateAccessToken(decoded.id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
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
};
