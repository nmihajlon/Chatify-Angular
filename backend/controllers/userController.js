import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const users = await User.find({ _id: { $ne: currentUserId } }, "-password");

    return res.status(200).json({ users });
  } catch (err) {
    console.error("Greška pri dohvatanju korisnika:", err);
    return res.status(500).json({ message: "Greška servera." });
  }
};

export const uploadAvatar = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Fajl nije poslat." });
  }

  const filePath = `/uploads/avatars/${req.file.filename}`;
  const fullUrl = `${req.protocol}://${req.get("host")}${filePath}`;

  res.status(200).json({
    message: "Slika uspešno uploadovana.",
    imageUrl: fullUrl,
  });
};