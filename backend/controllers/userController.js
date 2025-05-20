export const uploadAvatar = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Fajl nije poslat." });
  }

  const filePath = `/uploads/avatars/${req.file.filename}`;

  res.status(200).json({
    message: "Slika uspešno uploadovana.",
    imageUrl: filePath,
  });
};
