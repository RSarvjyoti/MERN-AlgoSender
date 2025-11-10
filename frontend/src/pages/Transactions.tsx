import { useEffect, useState } from "react";
import axios from "axios";

interface Transaction {
  _id: string;
  txId: string;
  from: string;
  to: string;
  amount: number;
  status: string;
  note: string;
  confirmedRound?: number;
  createdAt: string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/algorand/transactions`)
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg text-gray-800">Loading transactions...</p>;

  return (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-black drop-shadow">
        Transaction History
      </h2>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-700">No transactions yet.</p>
      ) : (
        <div className="max-w-4xl mx-auto grid gap-6">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="bg-white shadow-lg p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-wrap gap-4 mb-2">
                <span className="font-semibold text-black">
                  <strong>TxID:</strong> {tx.txId}
                </span>
                <span className="font-semibold text-black">
                  <strong>Amount:</strong> {tx.amount} ALGO
                </span>
                <span className="font-semibold">
                  <strong>Status:</strong>{" "}
                  <span className={tx.status === "confirmed" ? "text-green-700" : "text-yellow-700"}>
                    {tx.status}
                  </span>
                </span>
                {tx.confirmedRound && (
                  <span className="font-semibold text-black">
                    <strong>Round:</strong> {tx.confirmedRound}
                  </span>
                )}
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-800"><strong>From:</strong> {tx.from}</p>
                <p className="text-sm text-gray-800"><strong>To:</strong> {tx.to}</p>
              </div>
              <p className="text-sm text-gray-600 mb-2"><strong>Note:</strong> {tx.note}</p>
              <p className="text-xs text-gray-500">
                <strong>Date:</strong> {new Date(tx.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}