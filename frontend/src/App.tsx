import {Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <>
      <nav className="bg-white bg-opacity-30 backdrop-blur-lg shadow-md rounded-b-xl p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl text-gray-800 drop-shadow hover:text-blue-500 transition-colors">
          MERN-AlgoPay
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className="px-3 py-1 rounded-lg bg-blue-100 bg-opacity-60 hover:bg-blue-300 hover:bg-opacity-80 text-blue-700 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/transactions"
            className="px-3 py-1 rounded-lg bg-green-100 bg-opacity-60 hover:bg-green-300 hover:bg-opacity-80 text-green-700 font-medium transition-colors"
          >
            Transactions
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </>
  );
}

export default App;