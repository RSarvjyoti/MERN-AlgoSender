import algosdk from "algosdk";
import {config} from "dotenv"
config();

const ALGOD_SERVER = process.env.ALGOD_SERVER;
const ALGOD_PORT = process.env.ALGOD_PORT || "";
const ALGOD_TOKEN = process.env.ALGOD_TOKEN || "";

if (!ALGOD_SERVER) {
  console.error("Missing ALGOD_SERVER in .env — check your environment file!");
  process.exit(1);
}

// console.log("Connecting to Algorand node:", ALGOD_SERVER);

const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);

export default algodClient;