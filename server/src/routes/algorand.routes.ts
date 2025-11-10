import express from "express";
import { getAllTransactions, getTransactionStatus, sendTransaction } from "../controllers/algorand.controller";

const router = express.Router();

router.post("/send", sendTransaction);
router.get("/status/:txId", getTransactionStatus);
router.get("/transactions", getAllTransactions);

export default router;
