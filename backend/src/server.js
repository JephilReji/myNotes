import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from"path";


dotenv.config();
// console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001 ;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
    app.use(cors(
    {
        origin:"http://localhost:5173"
    }
));
}

app.use(express.json()); //middleware (without this cant use json like , {title,content} within {})
app.use(rateLimiter);

app.use("/api/notes",notesRoutes);

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist"))) // code 0- deployment

    app.get("*",(req,res) =>{
        res.sendFile(path.join(__dirname,"../frontend/","dist","index.html"))
    })
}


connectDb().then(() =>{       // production grade process 1. conect db 2. listen port
    app.listen(PORT, () =>{
    console.log("server running on PORT",PORT);
});

});


