import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  referralCode: string;
  referredBy?: mongoose.Types.ObjectId | null;
  credits: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  referralCode: { type: String, required: true, unique: true },
  referredBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  credits: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<IUser>("User", UserSchema);
