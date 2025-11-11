import mongoose, { Schema, Document } from "mongoose";

interface ITransaction extends Document {
  txId: string;
  from: string;
  to: string;
  amount: number;
  status: "pending" | "confirmed" | "failed";
  note?: string;
  confirmedRound?: number;
  createdAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  txId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "failed"],
    default: "pending",
  },
  note: {
    type: String,
    default: "",
  },
  confirmedRound: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;