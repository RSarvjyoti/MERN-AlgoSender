import { useState } from "react";
import axios from "axios";

export default function TransactionForm() {
  const [mnemonic, setMnemonic] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [response, setResponse] = useState<any>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/algorand/send`, {
        mnemonic,
        to,
        amount,
      });
      setResponse(res.data);
    } catch (err: any) {
      alert(err.response?.data?.error || "Error sending transaction");
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-10 p-6 rounded-3xl shadow-2xl bg-white border border-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center drop-shadow">Send TestNet ALGO</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <textarea
          placeholder="Sender Mnemonic"
          value={mnemonic}
          onChange={e => setMnemonic(e.target.value)}
          className="border border-gray-400 bg-gray-50 p-4 mb-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 transition w-full text-gray-900"
          rows={3}
        />
        <input
          placeholder="Recipient Address"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="border border-gray-400 bg-gray-50 p-4 mb-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 transition w-full text-gray-900"
        />
        <input
          placeholder="Amount (ALGO)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="border border-gray-400 bg-gray-50 p-4 mb-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 transition w-full text-gray-900"
        />
        <button
          className="bg-black text-white font-semibold py-3 px-6 mt-2 rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-200 w-full"
        >
          Send
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 rounded-xl bg-gray-100 border border-gray-300 shadow">
          <p className="font-semibold text-gray-900"><strong>Transaction ID:</strong> {response.txId}</p>
          <p className="text-gray-800">Status: {response.transaction.status}</p>
        </div>
      )}
    </div>
  );
}