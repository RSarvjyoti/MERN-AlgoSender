import {connect} from "mongoose";

const connectDB = async () => {
    try{
        await connect(process.env.MONGO_URL as string);
        console.log("Connected database");
        
    }catch(error){
     console.error("MongoDB Connection Error:", error);
     process.exit(1);
    }
}

export default connectDB;