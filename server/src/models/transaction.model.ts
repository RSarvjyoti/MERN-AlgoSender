import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  txId: String,
  from: String,
  to: String,
  amount: Number,
  status: String,
  note: String,
  createdAt: { type: Date, default: Date.now },
  confirmedRound: Number,
});

export const Transaction = mongoose.model("Transaction", transactionSchema);