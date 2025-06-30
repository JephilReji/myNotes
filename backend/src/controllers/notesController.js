import Note from "../models/Note.js"
export async function getAllNotes (req,res){
    try{    
        const notes = await Note.find().sort({createdAt:-1}); //lifo , newest first 
        res.status(200).json(notes);
    } catch(error) {
        console.error("Error in getAllNotes controller");
        res.status(500).json({message:"Internal Server Error",error});
    }
};

export async function getNoteById(req,res){
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({message:"Note not found !"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in GetNoteById controller");
        res.status(500).json({message:"Internal Server Error",error});
    }
}

export async function CreateNote(req,res){
    try{
        const {title,content} = req.body
        const notes = new Note ({title, content})

        const SavedNotes = await notes.save()
        res.status(201).json(SavedNotes)

    } catch(error) {
        console.error("Error in CreateNote controller");
        res.status(500).json({message:"Internal Server Error",error});
    }
};

export async function UpdateNote(req,res){
    try {
        const {title,content} = req.body;
        const updateNotes = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title,content
            },
            {
                new: true,
            }
        );

        if (!updateNotes) return res.status(404).json({message:"Notes not found"});

        res.status(200).json(updateNotes);
    } catch (error) {
        console.error("Error in UpdateNote controller",error);
        res.status(500).json({message:"Internal Server Error",error});
    }
};

export async function DeleteNote(req,res){

try {
    const {title,content} = req.body;
    const DeleteNotes = await Note.findByIdAndDelete(req.params.id);

    if (!DeleteNotes) return res.status(404).json({message:"Note not found !"});
    
    res.status(200).json(DeleteNotes);

} catch (error) {
    console.error("Error in DeleteNote controller",error);
    res.status(500).json({message:"Internal Server Error",error});
}};