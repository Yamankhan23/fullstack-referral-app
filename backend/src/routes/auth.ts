import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Referral from "../models/Referral";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

function genReferralCode(name: string) {
    const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
    return `${name.split(" ")[0]?.toUpperCase() || "USR"}${suffix}`;
}

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, referralCode } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: "Email exists" });

        const hash = await bcrypt.hash(password, 10);
        let code = genReferralCode(name);
        // ensure uniqueness
        while (await User.findOne({ referralCode: code })) {
            code = genReferralCode(name);
        }

        const user = new User({ name, email, passwordHash: hash, referralCode: code });
        // If referralCode provided, link after creating user
        await user.save();

        if (referralCode) {
            const referrer = await User.findOne({ referralCode });
            if (referrer) {
                const referral = new Referral({
                    referrerId: referrer._id,
                    referredId: user._id,
                    code: referralCode,
                    status: "pending"
                });
                await referral.save();
                // set referredBy
                user.referredBy = referrer._id as any;
                await user.save();
            }
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ user: { id: user._id, name: user.name, email: user.email, referralCode: user.referralCode }, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: { id: user._id, name: user.name, email: user.email, referralCode: user.referralCode }, token });
});

export default router;
