import express from "express";
import jwt from "jsonwebtoken";
import Referral from "../models/Referral";
/* import User from "../models/User"; */

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

// GET /api/referrals - list all referrals for logged-in user
router.get("/", authMiddleware, async (req: any, res) => {
    try {
        const referrals = await Referral.find({ referrerId: req.userId })
            .populate("referredId", "name email")
            .sort({ createdAt: -1 });

        res.json({ referrals });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch referrals" });
    }
});

// GET /api/referrals/:id - detail view
router.get("/:id", authMiddleware, async (req: any, res) => {
    try {
        const referral = await Referral.findOne({
            _id: req.params.id,
            referrerId: req.userId
        }).populate("referredId", "name email");

        if (!referral) return res.status(404).json({ message: "Referral not found" });
        res.json({ referral });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch referral" });
    }
});

export default router;
