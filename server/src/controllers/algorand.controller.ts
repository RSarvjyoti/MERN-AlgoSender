import { Request, Response } from "express";
import algosdk from "algosdk";
import Transaction from "../models/transaction.model";
import  {algodClient } from "../utils/algodClient";

export const sendTransaction = async (req: Request, res: Response) => {
  try {
    const { mnemonic, to, amount, note } = req.body;

    if (!mnemonic || typeof mnemonic !== "string") {
      return res.status(400).json({ success: false, error: "Invalid mnemonic format" });
    }

    const mnemonicTrimmed = mnemonic.trim().toLowerCase();
    const words = mnemonicTrimmed.split(/\s+/);

    if (words.length !== 25) {
      return res.status(400).json({
        success: false,
        error: `Mnemonic must contain exactly 25 words. You provided ${words.length}.`,
      });
    }

    if (!to || !algosdk.isValidAddress(to)) {
      return res.status(400).json({ success: false, error: "Invalid recipient address" });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, error: "Amount must be greater than 0" });
    }

    let account;
    try {
      account = algosdk.mnemonicToSecretKey(mnemonicTrimmed);
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        error: "Invalid mnemonic. Please check your words and try again.",
      });
    }

    const suggestedParams = await algodClient.getTransactionParams().do();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: account.addr,
      to,
      amount: Math.round(Number(amount) * 1e6),
      note: note ? Buffer.from(note, "utf8") : undefined,
      suggestedParams,
    } as any);

    const signedTxn = txn.signTxn(account.sk);
    const sendResponse = await algodClient.sendRawTransaction(signedTxn).do();

    const txId = sendResponse.txid;

    const newTx = await Transaction.create({
      txId,
      from: account.addr,
      to,
      amount,
      status: "pending",
      note,
    });

    res.status(200).json({ success: true, txId, transaction: newTx });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { txId } = req.params;
    const tx = await Transaction.findOne({ txId });

    if (!tx) {
      return res.status(404).json({ success: false, error: "Transaction not found" });
    }

    res.status(200).json({ success: true, transaction: tx });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllTransactions = async (_req: Request, res: Response) => {
  try {
    const txs = await Transaction.find().sort({ createdAt: -1 });
    res.json({ success: true, transactions: txs });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const generateTestAccount = (_req: Request, res: Response) => {
  try {
    const account = algosdk.generateAccount();
    const mnemonic = algosdk.secretKeyToMnemonic(account.sk);
    res.status(200).json({
      success: true,
      mnemonic,
      address: account.addr,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};