import mongoose from "mongoose";

export const connectDb = async() =>{
    try
    {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB connected!!!")
    } 
    catch(error)
    {
        console.log("Error connecting to MONGODb",error);
        process.exit(1) //exit with failure
    }
}