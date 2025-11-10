import { Request, Response } from "express";
import algosdk from "algosdk";
import algodClient from "../utils/algodClient";
import { Transaction } from "../models/transaction.model";

export const sendTransaction = async (req: Request, res: Response) => {
  try {
    const { mnemonic, to, amount, note } = req.body;
    const account = algosdk.mnemonicToSecretKey(mnemonic);

    const suggestedParams = await algodClient.getTransactionParams().do();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: account.addr,
      to,
      amount: Math.round(Number(amount) * 1e6),
      note: algosdk.encodeObj(note || "Test transaction"),
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
    const pending = await algodClient.pendingTransactionInformation(txId).do();

    const confirmedRound = pending.confirmedRound;
    const status = confirmedRound ? "confirmed" : "pending";

    await Transaction.findOneAndUpdate(
      { txId },
      { status, confirmedRound: confirmedRound || null }
    );

    res.json({ txId, status, confirmedRound });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTransactions = async (_req: Request, res: Response) => {
  const txs = await Transaction.find().sort({ createdAt: -1 });
  res.json(txs);
};