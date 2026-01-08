"use client";
import { FadeLoader } from "react-spinners";
import { NotebookPen, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({});
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // validation
  const validate = () => {
    let newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!desc.trim()) newErrors.desc = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // add note
  const handleAddNote = () => {
    if (!validate()) return;
    setIsAdding(true);
    const newNote = {
      id: Date.now(),
      title,
      desc,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setDesc("");
    setErrors({});
    setIsAdding(false);
  };

  // delete note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto sm:p-5">
      {/* Create Notes */}
      <div className="flex flex-col gap-4 w-full border border-indigo-300 p-5 rounded-md">
        <p className="text-gray-700 font-semibold text-xl flex items-center gap-2">
          Create Notes <Plus />
        </p>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-2 rounded-md outline-none border border-indigo-400"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="px-3 py-2 rounded-md outline-none border border-indigo-400 resize-none"
        />
        {errors.desc && <p className="text-red-500 text-sm">{errors.desc}</p>}

        <button
          onClick={handleAddNote}
          disabled={isAdding}
          className={`flex items-center gap-2 w-28 justify-center py-2 rounded-lg
           ${
             isAdding
               ? "bg-indigo-300 cursor-not-allowed"
               : "bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
           }
         text-white transition`}
        >
          {isAdding ? "Adding..." : "Add"} <Plus size={15} />
        </button>
      </div>

      {/* 🔹 Notes Count */}
      {!loading && notes.length > 0 && (
        <p className="mt-4 text-sm text-gray-600">
          Total Notes: <span className="font-semibold">{notes.length}</span>
        </p>
      )}

      {/* Notes List */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <FadeLoader color="#4F46E5" />
        </div>
      ) : notes.length > 0 ? (
        <div className="mt-4 space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="border border-gray-200 rounded-md p-4 flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-indigo-600">{note.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{note.desc}</p>
              </div>

              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center flex flex-col items-center gap-2 font-semibold text-xl sm:text-2xl text-gray-700">
          <NotebookPen className="text-yellow-600" size={40} />
          No Notes Available. Add Your First Note
        </p>
      )}
    </div>
  );
}
