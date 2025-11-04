import express from "express";
import jwt from "jsonwebtoken";
import Referral from "../models/Referral";
import User from "../models/User";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

// middleware for auth
function authMiddleware(req: any, res: any, next: any) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "Missing auth header" });
    const token = header.split(" ")[1];
    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
}

// GET /api/dashboard - fetch referral stats and credits
router.get("/", authMiddleware, async (req: any, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const referrals = await Referral.find({ referrerId: req.userId });

        const totalReferred = referrals.length;
        const convertedUsers = referrals.filter(r => r.status === "converted").length;
        const totalCredits = user.credits;

        res.json({
            name: user.name,
            email: user.email,
            referralCode: user.referralCode,
            totalReferred,
            convertedUsers,
            totalCredits
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to load dashboard data" });
    }
});

export default router;
