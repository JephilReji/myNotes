import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note ,setNotes}) => {


  const handleDelete = async (e,id) => {
    e.preventDefault();  //get rid of nav behaiour , does jump to link directly

    if(!window.confirm("Are you sure to delete ???")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id)) //gets rid of deleted note
      toast.success("noted deleted !")
    } catch (error) {
      console.log("failed to delete",error);
      toast.error("failed to delete note !");
    }
  }
  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-[#d6d6d6]">
      <div className="card-body">
        <Link to={`/note/${note._id}`}>
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/60 line-clamp-3">{note.content}</p>
        </Link>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <Link to={`/edit/${note._id}`}>
              <PenSquareIcon className="size-4" />
            </Link>
            <button
              className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e,note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
