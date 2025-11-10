# MERN-AlgoSender

A full-stack web application for sending Algorand TestNet transactions and viewing transaction history. Built with MongoDB, Express, React, Node.js, and Algorand SDK.

---

## Features

- Send ALGO on Algorand TestNet using mnemonic
- View transaction history
- Modern, responsive UI

---
## Folder Structure 

```
MERN-AlgoSender/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   └── algorand.controller.ts
│   │   ├── models/
│   │   │   └── transaction.model.ts
│   │   ├── routes/
│   │   │   └── algorand.routes.ts
│   │   ├── utils/
│   │   │   └── algodClient.ts
│   │   ├── index.ts
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── TransactionForm.tsx
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   └── Transactions.tsx
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- Algorand TestNet account (get one at [Algorand Sandbox](https://bank.testnet.algorand.network/))

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/MERN-AlgoSender.git
cd MERN-AlgoSender
```

---

### 2. Backend Setup (`server`)

#### a. Install dependencies

```bash
cd server
npm install
```

#### b. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

**Example `.env`:**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/algosender
ALGOD_SERVER=https://testnet-api.algonode.cloud
ALGOD_PORT=443
ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

#### c. Start the backend server

```bash
npm run dev
```

The backend will run on `http://localhost:5000` by default.

---

### 3. Frontend Setup (`frontend`)

#### a. Install dependencies

```bash
cd ../frontend
npm install
```

#### b. Configure environment variables

Copy `.env.example` to `.env` and set your backend API URL:

```bash
cp .env.example .env
```

**Example `.env`:**
```
VITE_API_BASE_URL=http://localhost:5000
```

#### c. Start the frontend development server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

---

## Usage

1. Open your browser and go to `http://localhost:5173`.
2. Use the form to send ALGO on TestNet.
3. View transaction history on the Transactions page.


---

## Environment Variables

### Backend (`server/.env`)
- `PORT`: Port for Express server
- `MONGO_URI`: MongoDB connection string
- `ALGOD_SERVER`: Algorand TestNet API endpoint
- `ALGOD_PORT`: Algorand API port
- `ALGOD_TOKEN`: Algorand API token

### Frontend (`frontend/.env`)
- `VITE_API_BASE_URL`: Backend API base URL

---

## Scripts

### Backend

- `npm run dev` — Start backend in development mode
- `npm start` — Start backend in production mode

### Frontend

- `npm run dev` — Start frontend in development mode
- `npm run build` — Build frontend for production

---

## License

MIT

---

## Credits

- [Algorand JS SDK](https://github.com/algorand/js-algorand-sdk)
- [Tailwind CSS](https://tailwindcss.com/)