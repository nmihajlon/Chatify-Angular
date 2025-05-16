import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if(!token){
        return res.status(401).json({message: "Not authenticated"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(403).json({message: "Access token is expired"});
    }
};

export default authMiddleware;