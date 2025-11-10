import express, {Request, Response} from "express"
import {config} from "dotenv"
import connectDB from "./config/db";

config();
connectDB()
const app = express();
const PORT = process.env.PORT;

app.get('/', (req : Request, res : Response):void => {
    res.send("Welcome to the MERN-Algosender");
})

app.listen(PORT, ():void => {
    console.log(`Server is runing at http://localhost:${PORT}`);
})