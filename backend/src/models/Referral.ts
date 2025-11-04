import mongoose, { Schema, Document } from "mongoose";

export interface IReferral extends Document {
  referrerId: mongoose.Types.ObjectId;
  referredId: mongoose.Types.ObjectId;
  code: string;
  status: "pending" | "converted";
  rewardGiven: { referrer: boolean; referred: boolean };
  createdAt: Date;
  convertedAt?: Date;
}

const ReferralSchema = new Schema<IReferral>({
  referrerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  referredId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  code: { type: String, required: true },
  status: { type: String, default: "pending" },
  rewardGiven: {
    referrer: { type: Boolean, default: false },
    referred: { type: Boolean, default: false }
  },
  convertedAt: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model<IReferral>("Referral", ReferralSchema);
