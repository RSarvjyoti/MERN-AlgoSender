import TransactionForm from "../components/TransactionForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 drop-shadow text-center">
        Algorand TestNet Sender
      </h1>
      <TransactionForm />
    </div>
  );
}