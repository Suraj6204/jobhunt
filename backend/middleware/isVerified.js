import { User } from "../models/user.model.js";

export const isVerified = async (req, res, next) => {
    try {
        const userId = req.id; // isAuthenticated se mil rahi ID
        const user = await User.findById(userId);

        if (!user || !user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email to perform this action.",
                success: false
            });
        }

        next(); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};