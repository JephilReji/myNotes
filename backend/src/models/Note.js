 import mongoose from "mongoose"

// 1st : create schema
//2nd create model based off the schema


 const noteSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            requiredd:true
        },
        content:{
            type:String,
            required:true
        },
        
    },
    {
        timestamps: true //created at , updated at
    }
 );

 const Note = mongoose.model("Note", noteSchema)

 export default Note


