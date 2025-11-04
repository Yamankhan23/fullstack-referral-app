import mongoose, { Schema, Document } from "mongoose";

export interface IPurchase extends Document {
  userId: mongoose.Types.ObjectId;
  productId?: string;
  amount: number;
  createdAt: Date;
}

const PurchaseSchema = new Schema<IPurchase>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: String },
  amount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<IPurchase>("Purchase", PurchaseSchema);
