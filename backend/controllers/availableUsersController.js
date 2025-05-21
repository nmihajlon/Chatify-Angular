import AvailableUsers from "../models/AvailableUsers.js";

export const addAvailableUser = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "userId je obavezan." });
  }

  try {
    const alreadyExists = await AvailableUsers.findOne({ user: userId });
    if (alreadyExists) {
      return res.status(409).json({ message: "Korisnik je već u listi." });
    }

    const newAvailableUser = new AvailableUsers({ user: userId });
    await newAvailableUser.save();

    return res.status(201).json({ message: "Korisnik dodat u dostupne." });
  } catch (err) {
    res.status(500).json({ message: "Greška pri dodavanju korisnika.", err });
  }
};

export const getAvailableUsers = async (req, res) => {
  try {
    const users = await AvailableUsers.find({
      user: { $ne: req.user._id },
    }).populate("user", "username avatar");
    res.status(200).json(users.map((entry) => entry.user));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška pri listanju dostupnih korisnika", error });
  }
};
