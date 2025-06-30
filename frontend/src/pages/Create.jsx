import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";
import {toast} from "react-hot-toast";

const CreatePage = () => {
  const [title,setTitle] = useState("");
  const [content,setContent]= useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();  // stops refresh

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes",{
        title,
        content
      })
      toast.success("Note created successfully");
      navigate("/")
    } catch (error) {
      console.log("error creating note",error)
      toast.error("failed to create note, try later");
    } finally{
      setLoading(false)
    }
  }; 

  return (
  <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link for= "/" className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5"/> 
            Back to notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create new note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" placeholder="Enter Title" className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  ></input>

                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea placeholder="Enter Content" className="textarea textarea-bordered h-32"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  />

                </div>

                <div className="card-actions justify-end">
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "creating...." : "Create note"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
    </div>
  </div>
  );
}

export default CreatePage
