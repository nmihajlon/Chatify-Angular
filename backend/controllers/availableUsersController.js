import AvailableList from "../models/AvailableList.js";
import { getIo } from "../socket.js";

export const addAvailableUser = async (req, res) => {
  const { userIdToAdd } = req.body;
  const ownerId = req.user._id;

  if (!userIdToAdd) {
    return res.status(400).json({ message: "userId je obavezan." });
  }

  if (userIdToAdd === ownerId.toString()) {
    return res.status(400).json({ message: "Ne možeš dodati samog sebe." });
  }

  try {
    let availableList = await AvailableList.findOne({ owner: ownerId });

    if (!availableList) {
      availableList = new AvailableList({ owner: ownerId, users: [] });
    }

    if (availableList.users.includes(userIdToAdd)) {
      return res.status(409).json({ message: "Korisnik je već u listi." });
    }

    availableList.users.push(userIdToAdd);
    await availableList.save();

    const io = getIo();  
    io.to(ownerId.toString()).emit("availableListUpdated", availableList.users);

    return res.status(201).json({ message: "Korisnik dodat u dostupne." });
  } catch (err) {
    res.status(500).json({ message: "Greška pri dodavanju korisnika.", err });
  }
};

export const getAvailableUsers = async (req, res) => {
  try {
    const list = await AvailableList.findOne({ owner: req.user._id }).populate(
      "users",
      "username avatar"
    );

    if (!list) {
      return res
        .status(404)
        .json({ message: "Lista dostupnih korisnika nije pronađena." });
    }

    res.status(200).json(list.users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška pri dohvatanju dostupnih korisnika", error });
  }
};
