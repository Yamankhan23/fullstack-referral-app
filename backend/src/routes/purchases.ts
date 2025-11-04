import express from "express";
import jwt from "jsonwebtoken";
import Purchase from "../models/Purchase";
import Referral from "../models/Referral";
import User from "../models/User";
import mongoose from "mongoose";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

function authMiddleware(req: any, res: any, next: any) {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ message: "Missing auth" });
  const token = h.split(" ")[1];
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.post("/buy", authMiddleware, async (req: any, res) => {
  const { productId, amount } = req.body;
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  // create purchase
  const purchase = new Purchase({ userId, productId, amount });
  await purchase.save();

  // Process referral credits atomically
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // find referral where referredId = userId and status != converted
    const referral = await Referral.findOneAndUpdate(
      { referredId: userId, status: { $ne: "converted" } },
      { $set: { status: "converted", convertedAt: new Date() } },
      { new: true, session }
    );

    if (referral) {
      // award 2 credits each
      const referrer = await User.findById(referral.referrerId).session(session);
      const referred = await User.findById(userId).session(session);
      if (referrer && referred) {
        // avoid double awarding using rewardGiven flags if needed; here status change prevents re-run
        referrer.credits += 2;
        referred.credits += 2;
        await referrer.save({ session });
        await referred.save({ session });
        // Could also create credits_log entries here
      }
    }

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    console.error("transaction err", err);
  } finally {
    session.endSession();
  }

  res.json({ purchase, referralConverted: !!referral });
});

export default router;
