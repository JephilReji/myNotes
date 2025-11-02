import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url"; // Import for ES module directory path

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001 ;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if(process.env.NODE_ENV !== "production"){
    app.use(cors(
    {
        origin:"http://localhost:5173"
    }
));
}

app.use(express.json());
// rateLimiter removed — requests are no longer rate-limited here

app.use("/api/notes",notesRoutes);

if (process.env.NODE_ENV === "production"){
    // Corrected pathing: Go up twice (from src/ to backend/ to root/)
    const frontendPath = path.join(__dirname, '..', '..', 'frontend', 'dist');

    app.use(express.static(frontendPath)); // code 0- deployment

    app.get("*",(req,res) =>{
        res.sendFile(path.join(frontendPath, "index.html"));
    })
}


connectDb().then(() =>{ 
    app.listen(PORT, () =>{
    console.log("server running on PORT",PORT);
});

});
