import express, {Request, Response} from "express"
import cors from "cors";
import {config} from "dotenv"
import connectDB from "./config/db";
import algorandRoutes from "./routes/algorand.routes";

config();
connectDB()
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req : Request, res : Response):void => {
    res.send("Welcome to the MERN-Algosender");
})

app.use('/api/algorand', algorandRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ():void => {
    console.log(`Server is running at http://localhost:${PORT}`);
})