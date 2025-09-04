import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const users = await User.find({ _id: { $ne: currentUserId } }, "-password");

    return res.status(200).json({ users });
  } catch (err) {
    console.error("Greska pri dohvatanju korisnika:", err);
    return res.status(500).json({ message: "Greska servera." });
  }
};

export const uploadAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Fajl nije poslat." });
  }

  const filePath = `/uploads/avatars/${req.file.filename}`;
  const fullUrl = `${req.protocol}://${req.get("host")}${filePath}`;

  try {
    await User.findByIdAndUpdate(req.user._id, {
      avatar: fullUrl,
    });

    return res.status(200).json({
      message: "Slika uspesno uploadovana.",
      imageUrl: fullUrl,
    });
  } catch (err) {
    console.error("Greska pri cuvanju avatara u bazu:", err);
    return res.status(500).json({ message: "Greska pri cuvanju avatara." });
  }
};